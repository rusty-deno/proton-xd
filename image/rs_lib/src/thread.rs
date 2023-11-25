use crate::*;
use wasm_thread::{
  Thread as Inner,
  self as thread
};


#[wasm_bindgen]
#[allow(dead_code)]
pub struct Thread {
  inner: Inner
}

#[wasm_bindgen]
impl Thread {
  #[wasm_bindgen(constructor)]
  pub unsafe fn new(_ptr: *const ()) {
    unimplemented!()
  }
}

impl From<Inner> for Thread {
  fn from(inner: Inner)-> Self {
    Thread { inner }
  }
}


#[wasm_bindgen]
pub fn current()-> Thread {
  thread::current().into()
}


