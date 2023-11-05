use crate::ser::*;
use Format::*;
use image::{
  RgbaImage,
  codecs::*,
  ColorType::Rgba8,
  load_from_memory
};
use wasm_bindgen::{
  prelude::*,
  UnwrapThrowExt
};



#[wasm_bindgen]
pub fn convert_sync(mut rgba: Vec<u8>,height: u32,width: u32,format: u8,color_type: u8,quality: u8)-> Vec<u8> {
  rgba.to_rgba8_if_needed(color_type);
  _convert(rgba,height,width,format.into(),quality)
}

#[wasm_bindgen_futures::wasm_bindgen::prelude::wasm_bindgen]
pub fn convert(mut rgba: Vec<u8>,height: u32,width: u32,format: u8,color_type: u8,quality: u8)-> Vec<u8> {
  rgba.to_rgba8_if_needed(color_type);
  _convert(rgba,height,width,format.into(),quality)
}

#[allow(deprecated)]
fn _convert(rgba: Vec<u8>,height: u32,width: u32,format: Format,quality: u8)-> Vec<u8> {
  let img=&RgbaImage::from_raw(width,height,rgba).expect_throw("cannot deref null ptr.");
  let mut buff: Vec<u8>=vec![];
  let w=&mut buff;

  match format {
    Png=> png::PngEncoder::new_with_quality(w,png::CompressionType::Best,png::FilterType::NoFilter).encode(img,width,height,Rgba8),
    Gif=> gif::GifEncoder::new(w).encode(img,width,height,Rgba8),
    Tga=> tga::TgaEncoder::new(w).encode(img,width,height,Rgba8),
    Bmp=> bmp::BmpEncoder::new(w).encode(img,width,height,Rgba8),
    Ico=> ico::IcoEncoder::new(w).encode(img,width,height,Rgba8),
    Farbfeld=> farbfeld::FarbfeldEncoder::new(w).encode(img,width,height),
    _=> jpeg::JpegEncoder::new_with_quality(w,quality).encode(img,width,height,Rgba8)
  }.or_else(|err| Err(err.to_string())).unwrap_throw();


  buff
}



#[wasm_bindgen]
pub fn image_from_buff(buffer: &[u8])-> Img {
  let img=load_from_memory(buffer).unwrap_or_default().to_rgba8();

  Img {
    height: img.height(),
    width: img.width(),
    rgba: img.into_vec()
  }
}



