use image::ImageFormat;
use wasm_bindgen::prelude::wasm_bindgen;


// macro_rules! Enum {
//   ($($t: ty)*)=> ($(
//     #[stable(feature = "rust1", since = "1.0.0")]
//     impl From<u8> for $t {
//       fn from(val: u8)-> $t {

//       }
//     }



//   )*)
// }




#[wasm_bindgen]
pub enum ColorType {
  L8,
  La8,
  Rgb8,
  Rgba8,

  L16,
  La16,
  Rgb16,
  Rgba16,

  Rgb32F,
  Rgba32F,
  
  Brga8
}


impl Into<image::ColorType> for ColorType {
  fn into(self)-> image::ColorType {
    use ColorType::*;
    match self {
      L8=> image::ColorType::L8,
      La8=> image::ColorType::La8,
      Rgb8=> image::ColorType::Rgb8,
      Rgba8|Brga8=> image::ColorType::Rgba8,
      L16=> image::ColorType::L16,
      La16=> image::ColorType::La16,
      Rgb16=> image::ColorType::Rgb16,
      Rgba16=> image::ColorType::Rgba16,
      Rgb32F=> image::ColorType::Rgb32F,
      Rgba32F=> image::ColorType::Rgba32F,
    }
  }
}

impl From<u8> for ColorType {
  fn from(value: u8)-> Self {
    use ColorType::*;
    match value {
      0=> L8,
      1=> La8,
      2=> Rgb8,
      4=> L16,
      5=> La16,
      6=> Rgb16,
      7=> Rgba16,
      8=> Rgb32F,
      9=> Rgba32F,
      10=> Brga8,
      _=> Rgba8
    }
  }
}

impl ColorType {
  pub(crate) fn is_brga8(&self)-> bool {
    match self {
      ColorType::Brga8=> true,
      _=> false
    }
  }
}

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




pub(crate) fn to_res<T>(err: Result<T,impl std::fmt::Display>)-> String {
  match err {
    Err(err)=> err.to_string(),
    _=> "".to_owned()
  }
}

