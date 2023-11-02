use crate::ser::*;
use wasm_bindgen::prelude::wasm_bindgen;
use image::{
  RgbaImage,
  codecs::*,
  ColorType::Rgba8,
  load_from_memory,
  ImageFormat,
  ImageResult,
};



#[wasm_bindgen]
pub fn convert(rgba: Vec<u8>,height: u32,width: u32,format: u8,quality: u8)-> Vec<u8> {
  _convert(rgba,height,width,format,quality).unwrap_or_default()
}

#[allow(deprecated)]
fn _convert(rgba: Vec<u8>,height: u32,width: u32,format: u8,quality: u8)-> Result<Vec<u8>,String> {
  let img=&RgbaImage::from_raw(width,height,rgba).ok_or("".to_owned())?;
  let mut buff: Vec<u8>=vec![];
  let w=&mut buff;
  
  match format {
    0=> png::PngEncoder::new_with_quality(w,png::CompressionType::Best,png::FilterType::NoFilter).encode(img,width,height,Rgba8),
    1=> gif::GifEncoder::new(w).encode(img,width,height,Rgba8),
    2=> tga::TgaEncoder::new(w).encode(img,width,height,Rgba8),
    4=> bmp::BmpEncoder::new(w).encode(img,width,height,Rgba8),
    5=> ico::IcoEncoder::new(w).encode(img,width,height,Rgba8),
    6=> farbfeld::FarbfeldEncoder::new(w).encode(img,width,height),
    _=> jpeg::JpegEncoder::new_with_quality(w,quality).encode(img,width,height,Rgba8)
  }.or_else(|err| Err(err.to_string()))?;

  Some(buff).ok_or("".to_owned())
}

#[wasm_bindgen]
pub struct Img {
  pub height: u32,
  pub width: u32,
  rgba: Vec<u8>
}

#[wasm_bindgen]
impl Img {
  #[wasm_bindgen(getter)]
  pub fn rgba(&self)-> Vec<u8> {
    self.rgba.clone()
  }
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

#[wasm_bindgen]
pub fn save_image_sync(path: &str,buff: &mut [u8],height: u32,width: u32,color_type: ColorType)-> String {
  to_res(_save_image(path,buff,height,width,color_type,ImageFormat::from_path(path)))
}

#[wasm_bindgen]
pub fn save_image_wtih_format_sync(path: &str,buff: &mut [u8],height: u32,width: u32,color_type: ColorType,format: Format)-> String {
  to_res(_save_image(path,buff,height,width,color_type,Ok(format.into())))
}



fn _save_image(path: &str,buff: &mut [u8],height: u32,width: u32,color_type: ColorType,fotmat: ImageResult<ImageFormat>)-> Result<(),impl std::fmt::Display> {
  let path=match std::path::Path::new(path).is_absolute() {
    true=> std::env::current_dir()?.join(path),
    _=> path.into()
  };
  if color_type.is_brga8() {
    to_rgba8(buff)
  }

  image::save_buffer_with_format(path,buff,width,height,color_type.into(),fotmat?)
}

fn to_rgba8(buff: &mut [u8]) {
  let mut i=0;
  let mut j: usize;

  while i<buff.len() {
    j=i+2;
    buff[i]=buff[i]^buff[j];
    buff[j]=buff[i]^buff[j];
    buff[i]=buff[i]^buff[j];
    buff[i+3]=255;
    i+=4;
  }
}

