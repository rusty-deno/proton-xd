#![cfg(test)]
use xd_macro::method;
use deno_bindgen_macro::deno_bindgen;

#[derive(Debug)]
struct XD;


#[method]
fn _xd(xd: &XD) {
  println!("{xd:#?}")
}
