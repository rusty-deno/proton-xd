extern crate proc_macro;

use syn::*;
use quote::quote;
use proc_macro::TokenStream;
use proc_macro2::TokenStream as Token;


#[proc_macro_attribute]
pub fn method(_attr: TokenStream,input: TokenStream)-> TokenStream {
  let f=syn::parse::<ItemFn>(input).unwrap();

  let modifier=modifier(&f);
  let name=f.sig.ident;
  let stmts=f.block.stmts;
  let return_type=f.sig.output;

  let params=f.sig.inputs;
  let this=params.first().expect("This function doesn't have any `this` argument.");
  let this_def=this_type(this);
  let params=params.into_iter().skip(1).collect::<punctuated::Punctuated<_,token::Comma>>();

  quote! {
    #modifier fn #name (ptr: usize,#params)#return_type {
      #this_def;
      #(#stmts)*
    }
  }.into()
}


fn modifier(f: &ItemFn)-> Token {
  let modifier=&f.vis;
  match &f.sig.abi {
    None=> quote! {
      #[deno_bindgen]
      #modifier 
    },
    Some(abi)=> quote! {
      #[no_mangle]
      #modifier #abi
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
    Some(_)=> quote! { let #pat_type=unsafe {(ptr as *mut #ty).as_mut().unwrap() } },
    _=> quote! { let #pat_type=unsafe {(ptr as *const #ty).as_ref().unwrap() } },
  }.into()
}

