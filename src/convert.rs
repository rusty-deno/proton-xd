use image::{
  RgbImage,
  codecs::*,
  ColorType::Rgba8,
};
use std::slice;


#[no_mangle]
pub extern "C" fn convert(bytes: *mut u8,length: usize,width: u32,height: u32,format: u8,quality: u8)-> *const u8 {
  let bytes=unsafe { Vec::from_raw_parts(bytes,length,length) };
  _convert(bytes,width,height,format,quality).unwrap().as_ptr()
}

#[allow(deprecated)]
fn _convert(bytes: Vec<u8>,width: u32,height: u32,format: u8,quality: u8)-> Option<Vec<u8>> {
  let img=&RgbImage::from_raw(width,height,bytes)?;
  let mut buff: Vec<u8>=vec![];
  let w=&mut buff;

  match format {
    0=> png::PngEncoder::new_with_quality(w,png::CompressionType::Best,png::FilterType::NoFilter).encode(img,width,height,Rgba8),
    1=> gif::GifEncoder::new(w).encode(img,width,height,Rgba8),
    2=> webp::WebPEncoder::new_with_quality(w,webp::WebPQuality::lossless()).encode(img,width,height,Rgba8),
    4=> tga::TgaEncoder::new(w).encode(img,width,height,Rgba8),
    5=> bmp::BmpEncoder::new(w).encode(img,width,height,Rgba8),
    6=> ico::IcoEncoder::new(w).encode(img,width,height,Rgba8),
    7=> farbfeld::FarbfeldEncoder::new(w).encode(img,width,height),
    _=> jpeg::JpegEncoder::new_with_quality(w,quality).encode(img,width,height,Rgba8)
  }.unwrap();
  Some(buff)
}





#[no_mangle]
pub unsafe extern "C" fn image_from_buff(buffer: *const u8,len: usize) {
  let buffer=slice::from_raw_parts(buffer,len);
  let _img=image::load_from_memory(buffer).unwrap_or_default();
  
}

