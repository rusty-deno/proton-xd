extern crate proc_macro;


use syn::ItemFn;
use quote::quote;
use proc_macro::TokenStream;


#[proc_macro_attribute]
pub fn xd(_attr: TokenStream,input: TokenStream)-> TokenStream {
  let func=syn::parse::<ItemFn>(input).unwrap();

  let name=func.sig.ident;
  let return_type=func.sig.output;

  TokenStream::from(quote! {
    #[deno_bindgen]
    pub fn #name (ptr: usize)#return_type {
      
    }
  })
}


// TokenStream::from(quote! {
//   #[no_mangle]
//   pub extern "C" fn #name <'sym> (#(#params,) *) -> #result {
//     fn __inner_impl #fn_generics (#fn_inputs) #fn_output #fn_block
//     #overrides
//     let result = __inner_impl(#(#input_idents, ) *);
//     #transformer
//   }
// })