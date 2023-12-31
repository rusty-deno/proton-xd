#[allow(dead_code)]
mod bindings;
extern crate proc_macro;


use syn::*;
use token::Mut;
use quote::quote;
use proc_macro::TokenStream;
use proc_macro2::TokenStream as TokenStream2;



#[proc_macro_attribute]
pub fn method(_attr: TokenStream,input: TokenStream)-> TokenStream {
  let f=syn::parse::<ItemFn>(input).unwrap();

  let modifier=modifier(&f);
  let name=f.sig.ident;
  let stmts=f.block.stmts;
  let return_type=f.sig.output;
  let generics=f.sig.generics;

  let params=f.sig.inputs;
  let this=params.first().expect("This function doesn't have any `this` argument.");
  let this_def=this_type(this);
  let params=params.into_iter().skip(1).collect::<punctuated::Punctuated<_,token::Comma>>();

  quote! {
    #modifier fn #name #generics (ptr: usize,#params)#return_type {
      #this_def;
      #(#stmts)*
    }
  }.into()
}


fn modifier(f: &ItemFn)-> TokenStream2 {
  let modifier=&f.vis;
  let unsafety=&f.sig.unsafety;
  match &f.sig.abi {
    None=> quote! {
      #[deno_bindgen]
      #modifier 
    },
    Some(abi)=> quote! {
      #[no_mangle]
      #modifier #unsafety #abi
    }
  }.into()
}


fn this_type(arg: &FnArg)-> proc_macro2::TokenStream {
  let pat_type=match arg {
    FnArg::Typed(typed)=> typed,
    _=> panic!("This macro cannot be used here.")
  };

  match pat_type.ty.as_ref() {
    Type::Path(_)=> quote! {
      let #pat_type=unsafe { *Box::from_raw(ptr as *mut _) }
    },
    Type::Ptr(ptr)=> {
      let mutability=mutability(&ptr.mutability);
      quote! { let #pat_type=ptr as *#mutability _ }
    },
    Type::Reference(reference)=> {
      let mut_=&reference.mutability;
      let mutability=mutability(mut_);
      let lifetime=&reference.lifetime;
      
      quote! {
        let #pat_type=unsafe { &#lifetime #mut_ *(ptr as *#mutability _) }
      }
    },
    _=> panic!("This function doesn't have a `this` argument")
  }
}


fn mutability(mutablity: &Option<Mut>)-> TokenStream2 {
  match mutablity {
    Some(m)=> quote! { #m },
    None=> quote! { const }
  }
}



