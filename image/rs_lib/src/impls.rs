use image::EncodableLayout;
use wasm_bindgen::JsValue;
use wasm_bindgen_futures::js_sys::Uint8Array;

use std::{
  rc::Rc,
  ptr
};


pub(crate) trait ToRgba {
  fn to_rgba8(&self);
  fn to_rgba8_if_needed(&self,color_type: u8) {
    if color_type==10 {
      self.to_rgba8();
    }
  }
}

impl ToRgba for Rc<[u8]> {
  fn to_rgba8(&self) {
    let buff=self.clone();
    let mut i=0;

    while i<buff.len() {
      unsafe {
        ptr::swap(buff[i].to_ptr(),buff[i+2].to_ptr());
        ptr::replace(buff[i+3].to_ptr(),255);
      }

      i+=4;
    }
  }
}

pub(crate) trait ToMutPtr: Sized {
  fn to_ptr(&self)-> *mut Self {
    self as *const Self as *mut Self
  }
}
impl<S> ToMutPtr for S {}



pub(crate) trait ToJsValue {
  fn to_js_value(self)-> JsValue;
}

impl ToJsValue for Vec<u8> {
  fn to_js_value(self)-> JsValue {
    Uint8Array::from(self.as_bytes()).into()
  }
}