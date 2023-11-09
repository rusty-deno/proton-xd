use image::EncodableLayout;
use wasm_bindgen::JsValue;
use wasm_bindgen_futures::js_sys::Uint8Array;

use std::ptr;


pub(crate) trait ToRgba {
  fn to_rgba8(&self);
  fn to_rgba8_if_needed(&self,is_brga: bool) {
    if is_brga {
      self.to_rgba8();
    }
  }
}

impl<S: std::ops::Deref<Target=[u8]>> ToRgba for S {
  fn to_rgba8(&self) {
    for (i,byte) in self.iter().step_by(4).enumerate() {
      unsafe {
        ptr::swap(byte.to_mut_ptr(),self[i+2].to_mut_ptr());
        ptr::replace(self[i+3].to_mut_ptr(),255);
      }
    }
  }
}


pub(crate) trait ToMutPtr: Sized {
  fn to_mut_ptr(&self)-> *mut Self {
    self as *const Self as *mut Self
  }

  fn as_mut_ptr(&mut self)-> *mut Self {
    self as *mut Self
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