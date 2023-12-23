extern crate proc_macro;

use syn::{ItemFn, FnArg, Type};
use quote::quote;
use proc_macro::TokenStream;


#[proc_macro_attribute]
pub fn method(_attr: TokenStream,input: TokenStream)-> TokenStream {
  let func=syn::parse::<ItemFn>(input).unwrap();
  let stmts=func.block.stmts;

  let name=func.sig.ident;
  let return_type=func.sig.output;
  let this=this_type(func.sig.inputs.first().expect("This function doesn't have any `this` argument."));


  quote! {
    #[deno_bindgen]
    pub fn #name (ptr: usize)#return_type {
      #this;
      #(#stmts)*
    }
  }.into()
}


fn this_type(arg: &FnArg)-> proc_macro2::TokenStream {
  let pat_type=match arg {
    FnArg::Typed(typed)=> typed,
    _=> panic!("This macro cannot be used here.")
  };
  let reference=match pat_type.ty.as_ref() {
    Type::Reference(reference)=> reference,
    _=> panic!("This function doesn't have a `this` argument"),
  };
  let ty=match reference.elem.as_ref() {
    Type::Path(p)=> &p.path.segments.first().unwrap().ident,
    _=> panic!()
  };


  match reference.mutability {
    Some(_)=> quote! { let #pat_type=unsafe {(ptr as *mut #ty).as_ref().unwrap() } },
    _=> quote! { let #pat_type=unsafe {(ptr as *const #ty).as_ref().unwrap() } },
  }.into()
}