use super::*;
use std::sync::Arc;
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
  pub(crate) bytes: Arc<[u8]>,
  is_bgra: bool
}

#[wasm_bindgen]
impl Img {
  #[wasm_bindgen(constructor)]
  pub fn new(bytes: Vec<u8>,height: u32,width: u32,is_bgra: bool)-> Self {
    Self {
      height,
      width,
      is_bgra,
      bytes: bytes.into(),
    }
  }

  #[wasm_bindgen]
  pub fn image_from_buff_sync(buff: &[u8],is_bgra: bool)-> Self {
    let img=load_from_memory(buff).unwrap_throw().to_rgba8();

    let (height,width)=(img.height(),img.width());
    let bytes=Arc::<[u8]>::from(img.into_vec());

    Img {
      height,
      width,
      bytes,
      is_bgra
    }
  }

  #[wasm_bindgen(getter)]
  pub fn bytes(&self)-> Uint8Array {
    Uint8Array::from(self.bytes.as_ref())
  }

  #[wasm_bindgen]
  #[allow(deprecated)]
  pub fn to_png_sync(&self,compression: u8,filter: u8)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    png::PngEncoder::new_with_quality(&mut w,compression.into_enum(),filter.into_enum())
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_jpeg_sync(&self,quality: u8)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    jpeg::JpegEncoder::new_with_quality(&mut w,quality)
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_gif_sync(&self)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    gif::GifEncoder::new(&mut w)
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  #[allow(deprecated)]
  pub fn to_ico_sync(&self)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    ico::IcoEncoder::new(&mut w)
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_bmp_sync(&self)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    bmp::BmpEncoder::new(&mut w)
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_tga_sync(&self)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    tga::TgaEncoder::new(&mut w)
    .encode(&self.bytes,self.width,self.height,Rgba8).unwrap_throw();

    w.into()
  }

  #[wasm_bindgen]
  pub fn to_farbfeld_sync(&self)-> Vec<u8> {
    self.bytes.to_rgba8_if_needed(self.is_bgra);
    
    let mut w=Writer::new();
    farbfeld::FarbfeldEncoder::new(&mut w)
    .encode(&self.bytes,self.width,self.height).unwrap_throw();

    w.into()
  }
}

#[async_fn]
pub async fn image_from_buff(buff: &[u8],is_bgra: bool)-> Img {
  Img::image_from_buff_sync(buff,is_bgra)
}

#[async_fn]
pub async fn to_png(img: &Img,compression: u8,filter: u8)-> Uint8Array {
  Img::to_png_sync(img,compression,filter).as_slice().into()
}

#[async_fn]
pub async fn to_jpeg(img: &Img,quality: u8)-> Uint8Array {
  Img::to_jpeg_sync(img,quality).as_slice().into()
}

#[async_fn]
pub async fn to_gif(img: &Img)-> Uint8Array {
  Img::to_gif_sync(img).as_slice().into()
}

#[async_fn]
pub async fn to_ico(img: &Img)-> Uint8Array {
  Img::to_ico_sync(img).as_slice().into()
}

#[async_fn]
pub async fn to_bmp(img: &Img)-> Uint8Array {
  Img::to_bmp_sync(img).as_slice().into()
}

#[async_fn]
pub async fn to_tga(img: &Img)-> Uint8Array {
  Img::to_tga_sync(img).as_slice().into()
}

#[async_fn]
pub async fn to_farbfeld(img: &Img)-> Uint8Array {
  Img::to_farbfeld_sync(img).as_slice().into()
}


