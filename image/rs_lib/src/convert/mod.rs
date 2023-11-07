use crate::ser::*;
use image::load_from_memory;

use wasm_bindgen::{
  UnwrapThrowExt,
  prelude::wasm_bindgen
};
use wasm_bindgen_futures::js_sys::Promise;


#[wasm_bindgen]
pub fn image_from_buff_sync(buffer: &[u8])-> Img {
  let img=load_from_memory(buffer).unwrap_throw().to_rgba8();

  Img {
    height: img.height(),
    width: img.width(),
    rgba: img.into_vec()
  }
}

#[wasm_bindgen_futures::wasm_bindgen::prelude::wasm_bindgen]
pub fn image_from_buff(buffer: &[u8])-> Promise {
  image_from_buff_sync(buffer).into()
}

