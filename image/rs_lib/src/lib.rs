use wasm_bindgen::prelude::wasm_bindgen;
use image::{
  RgbImage,
  codecs::*,
  ColorType::Rgba8,
  load_from_memory
};

#[wasm_bindgen]
pub fn convert(rgba: Vec<u8>,height: u32,width: u32,format: u8,quality: u8)-> Vec<u8> {
  _convert(rgba,height,width,format,quality).unwrap_or_default()
}

#[allow(deprecated)]
fn _convert(rgba: Vec<u8>,height: u32,width: u32,format: u8,quality: u8)-> Option<Vec<u8>> {
  let img=&RgbImage::from_raw(width,height,rgba)?;
  let mut buff: Vec<u8>=vec![];
  let w=&mut buff;
  
  match format {
    0=> png::PngEncoder::new_with_quality(w,png::CompressionType::Best,png::FilterType::NoFilter).encode(img,width,height,Rgba8),
    1=> gif::GifEncoder::new(w).encode(img,width,height,Rgba8),
    // 2=> webp::WebPEncoder::new_with_quality(w,webp::WebPQuality::lossless()).encode(img,width,height,Rgba8),
    4=> tga::TgaEncoder::new(w).encode(img,width,height,Rgba8),
    5=> bmp::BmpEncoder::new(w).encode(img,width,height,Rgba8),
    6=> ico::IcoEncoder::new(w).encode(img,width,height,Rgba8),
    7=> farbfeld::FarbfeldEncoder::new(w).encode(img,width,height),
    _=> jpeg::JpegEncoder::new_with_quality(w,quality).encode(img,width,height,Rgba8)
  }.unwrap();
  
  Some(buff)
}

#[wasm_bindgen]
pub struct Size {
  pub height: u32,
  pub width: u32,
  rgba: Vec<u8>
}

#[wasm_bindgen]
impl Size {
  #[wasm_bindgen(getter)]
  pub fn rgba(&self)-> Vec<u8> {
    self.rgba.clone()
  }
}


#[wasm_bindgen]
pub fn image_from_buff(buffer: &[u8])-> Size {
  let img=load_from_memory(buffer).unwrap_or_default().to_rgb8();

  Size {
    height: img.height(),
    width: img.width(),
    rgba: img.into_vec()
  }
}




