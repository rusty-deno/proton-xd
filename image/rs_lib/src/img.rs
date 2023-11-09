use super::*;
use std::rc::Rc;
use writer::Writer;
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
  pub fn to_png_sync(&self,compression: u8,filter: u8)-> Vec<u8> {
    let mut w=Writer::new();
    png::PngEncoder::new_with_quality(&mut w,compression.into_enum(),filter.into_enum())
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_jpeg_sync(&self,quality: u8)-> Vec<u8> {
    let mut w=Writer::new();
    jpeg::JpegEncoder::new_with_quality(&mut w,quality)
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_gif_sync(&self)-> Vec<u8> {
    let mut w=Writer::new();
    gif::GifEncoder::new(&mut w)
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  #[allow(deprecated)]
  pub fn to_ico_sync(&self)-> Vec<u8> {
    let mut w=Writer::new();
    ico::IcoEncoder::new(&mut w)
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_bmp_sync(&self)-> Vec<u8> {
    let mut w=Writer::new();
    bmp::BmpEncoder::new(&mut w)
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_tga_sync(&self)-> Vec<u8> {
    let mut w=Writer::new();
    tga::TgaEncoder::new(&mut w)
    .encode(&self.rgba,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_farbfeld_sync(&self)-> Vec<u8> {
    let mut w=Writer::new();
    farbfeld::FarbfeldEncoder::new(&mut w)
    .encode(&self.rgba,self.width,self.height).unwrap_throw();

    w.into()
  }
}

#[async_fn]
pub async fn image_from_buff(buff: &[u8],is_brga: bool)-> Img {
  Img::image_from_buff_sync(buff,is_brga)
}





