use wasm_bindgen::JsValue;
use wasm_bindgen_futures::js_sys::Uint8Array;


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

pub(crate) trait ToPromise<T: Into<JsValue>,E: Into<JsValue>=String>: Sized {
  fn to_promise(self)-> Result<JsValue,JsValue>;
}

impl<E: Into<JsValue>> ToPromise<Uint8Array,E> for Result<Vec<u8>,E> {
  fn to_promise(self)-> Result<JsValue,JsValue> {
    match self {
      Ok(res)=> Ok(Uint8Array::from(res.as_slice()).into()),
      Err(err)=> Err(err.into()),
    }
  }
}
