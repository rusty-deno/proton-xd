use super::*;
use std::rc::Rc;
use wasm_bindgen_futures::js_sys::Uint8Array;


use image::{
  load_from_memory,
  ColorType::Rgba8,
  codecs::*
};


#[wasm_bindgen]
pub struct Img {
  pub height: u32,
  pub width: u32,
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
  pub fn image_from_buff_sync(buff: &[u8],is_brga: bool)-> Self {
    let img=load_from_memory(buff).unwrap_throw().to_rgba8();

    let (height,width)=(img.height(),img.width());
    let rgba=Rc::<[u8]>::from(img.into_vec());

    rgba.to_rgba8_if_needed(is_brga);
    Img {
      height,
      width,
      rgba
    }
  }

  #[wasm_bindgen(getter)]
  pub fn rgba(&self)-> Uint8Array {
    Uint8Array::from(self.rgba.as_ref())
  }

  #[wasm_bindgen]
  #[allow(deprecated)]
  pub fn to_png_sync(&self,w: &mut [u8]) {
    png::PngEncoder::new(w).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw()
  }

  #[wasm_bindgen]
  pub fn to_jpeg_sync(&self,w: &mut [u8],quality: u8) {
    jpeg::JpegEncoder::new_with_quality(w,quality).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw()
  }

  #[wasm_bindgen]
  pub fn to_gif_sync(&self,w: &mut [u8]) {
    gif::GifEncoder::new(w).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();
  }

  #[wasm_bindgen]
  #[allow(deprecated)]
  pub fn to_ico_sync(&self,w: &mut [u8]) {
    ico::IcoEncoder::new(w).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw()
  }

  #[wasm_bindgen]
  pub fn to_bmp_sync(&self)-> Vec<u8> {
    let mut buff=vec![];
    bmp::BmpEncoder::new(&mut buff).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();
    buff
  }

  #[wasm_bindgen]
  pub fn to_tga_sync(&self,w: &mut [u8]) {
    tga::TgaEncoder::new(w).encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw()
  }

  #[wasm_bindgen]
  pub fn to_farbfeld_sync(&self,w: &mut [u8]) {
    farbfeld::FarbfeldEncoder::new(w).encode(&self.rgba,self.width,self.height).unwrap_throw()
  }
}

#[async_fn]
pub async fn image_from_buff(buff: &[u8],is_brga: bool)-> Img {
  Img::image_from_buff_sync(buff,is_brga)
}





