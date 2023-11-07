use std::rc::Rc;
use image::EncodableLayout;
use wasm_bindgen::JsValue;
use wasm_bindgen_futures::js_sys::{
  Uint8Array,
  Promise
};


pub(crate) trait ToRgba {
  fn to_rgba8(&mut self);
  fn to_rgba8_if_needed(&mut self,color_type: u8) {
    if color_type==10 {
      self.to_rgba8();
    }
  }
}

impl ToRgba for Vec<u8> {
  fn to_rgba8(&mut self) {
    let mut i=0;
    let mut j: usize;

    while i<self.len() {
      j=i+2;
      self[i]=self[i]^self[j];
      self[j]=self[i]^self[j];
      self[i]=self[i]^self[j];
      self[i+3]=255;
      i+=4;
    }
  }
}

impl ToRgba for Rc<[u8]> {
  fn to_rgba8(&mut self) {
    todo!()
  }
}




pub(crate) trait ToJsValue {
  fn to_js_value(self)-> JsValue;
}

impl ToJsValue for Vec<u8> {
  fn to_js_value(self)-> JsValue {
    Uint8Array::from(self.as_bytes()).into()
  }
}

pub(crate) trait ToPromise {
  fn to_promise(self)-> Promise;
}

impl<S> ToPromise for S where JsValue: From<S> {
  fn to_promise(self)-> Promise {
    JsValue::from(self).into()
  }
}

