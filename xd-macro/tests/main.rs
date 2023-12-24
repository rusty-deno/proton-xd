#![cfg(test)]

use xd_macro::method;
#[allow(unused_imports)]
use deno_bindgen_macro::deno_bindgen;

#[derive(Debug)]
struct XD;

#[test]
fn xd() {
  
}

#[method]
pub extern "C" fn _xd(xd: &mut XD) {
  println!("{xd:#?}")
}


