
mod bindings;
extern crate proc_macro;


use syn::*;
use token::Mut;
use quote::quote;
use proc_macro::TokenStream;
use proc_macro2::TokenStream as TokenStream2;



#[proc_macro_attribute]
pub fn method(attr: TokenStream,input: TokenStream)-> TokenStream {
  let f=syn::parse::<ItemFn>(input).unwrap();

  let modifier=modifier(&f,attr.into());
  let name=&f.sig.ident;
  let stmts=&f.block.stmts;
  let return_type=&f.sig.output;
  let generics=&f.sig.generics;

  let params=&f.sig.inputs;
  let this=params.first().expect("This function doesn't have any `this` argument.");
  let this_def=this_type(this);

  unsafe {
    std::ptr::replace(this as *const _ as *mut FnArg,syn::parse(quote! { ptr: usize }.into()).unwrap());
  };
  save_sig(&f.sig);

  quote! {
    #modifier fn #name #generics (#params)#return_type {
      #this_def;
      #(#stmts)*
    }
  }.into()
}


fn modifier(f: &ItemFn,attr: TokenStream2)-> TokenStream2 {
  let modifier=&f.vis;
  let asyncness=&f.sig.asyncness;
  let unsafety=&f.sig.unsafety;

  match &f.sig.abi {
    None=> quote! {
      #[deno_bindgen(#attr)]
      #modifier
    },
    Some(abi)=> quote! {
      #[no_mangle]
      #modifier #unsafety #abi #asyncness
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


fn save_sig(sig: &Signature) {
  if let None=&sig.abi  {
    return;
  }
  let _=bindings::Bindings::append("./bindings/bindings.prototype.json",sig.ident.to_string(),sig.into()).unwrap();
}



