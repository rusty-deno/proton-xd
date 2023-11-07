use std::rc::Rc;
use crate::ser::*;
use image::load_from_memory;
use wasm_bindgen_futures::js_sys::Promise;
use wasm_bindgen_futures::wasm_bindgen::prelude::wasm_bindgen as async_fn;

use wasm_bindgen::{
  prelude::wasm_bindgen,
  UnwrapThrowExt
};


#[wasm_bindgen]
pub struct Img {
  pub height: u32,
  pub width: u32,
  #[allow(unused)]
  pub(crate) rgba: Rc<[u8]>
}

#[wasm_bindgen]
impl Img {
  #[wasm_bindgen(constructor)]
  pub fn new(rgba: Vec<u8>,height: u32,width: u32)-> Self {
    Self {
      height,
      width,
      rgba: rgba.into()
    }
  }

  #[wasm_bindgen]
  pub fn image_from_buff_sync(buff: &[u8],color_type: u8)-> Self {
    let img=load_from_memory(buff).unwrap_throw().to_rgba8();
    let (height,width)=(img.height(),img.width());
    let mut rgba: Rc<[u8]>=img.into_vec().into();
    rgba.to_rgba8_if_needed(color_type);

    Img {
      height,
      width,
      rgba
    }
  }

  #[wasm_bindgen(getter)]
  pub fn rgba(&self) {
    unimplemented!()
  }

  // fn writer(&self)-> Result<image::RgbaImage,String> {
  //   image::RgbaImage::from(image::ImageBuffer::from(&vec![]));
  //   Ok(image::RgbaImage::from_raw(self.width,self.height,self.rgba).ok_or("cannot deref null ptr.".to_owned())?)
  // }

  #[wasm_bindgen]
  pub fn to_png(&self) {
    
  }





}

#[async_fn]
pub async fn image_from_buff(buff: &[u8],color_type: u8)-> Promise {
  Img::image_from_buff_sync(buff,color_type).to_promise()
}





