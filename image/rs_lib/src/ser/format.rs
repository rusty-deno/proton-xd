use image::ImageFormat;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub enum Format {
  Png,
  Jpeg,
  Gif,
  WebP,
  Pnm,
  Tiff,
  Tga,
  Dds,
  Bmp,
  Ico,
  Hdr,
  OpenExr,
  Farbfeld,
  Avif,
  Qoi,
}

impl Into<ImageFormat> for Format {
  fn into(self)-> ImageFormat {
    use ImageFormat::*;
    match self {
      Format::Png=> Png,
      Format::Jpeg=> Jpeg,
      Format::Gif=> Gif,
      Format::WebP=> WebP,
      Format::Pnm=> Pnm,
      Format::Tiff=> Tiff,
      Format::Tga=> Tga,
      Format::Dds=> Dds,
      Format::Bmp=> Bmp,
      Format::Ico=> Ico,
      Format::Hdr=> Hdr,
      Format::OpenExr=> OpenExr,
      Format::Farbfeld=> Farbfeld,
      Format::Avif=> Avif,
      Format::Qoi=> Qoi,
    }
  }
}

impl From<u8> for Format {
  fn from(value: u8)-> Self {
    use Format::*;
    match value {
      0=> Png,
      2=> Gif,
      3=> WebP,
      4=> Pnm,
      5=> Tiff,
      6=> Tga,
      7=> Dds,
      8=> Bmp,
      9=> Ico,
      10=> Hdr,
      11=> OpenExr,
      12=> Farbfeld,
      13=> Avif,
      14=> Qoi,
      _=> Jpeg,
    }
  }
}

