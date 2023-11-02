
use image::ImageFormat;
use wasm_bindgen::prelude::wasm_bindgen;


#[wasm_bindgen]
pub enum ColorType {
  /// Pixel is 8-bit luminance
  L8,
  /// Pixel is 8-bit luminance with an alpha channel
  La8,
  /// Pixel contains 8-bit R, G and B channels
  Rgb8,
  /// Pixel is 8-bit RGB with an alpha channel
  Rgba8,

  /// Pixel is 16-bit luminance
  L16,
  /// Pixel is 16-bit luminance with an alpha channel
  La16,
  /// Pixel is 16-bit RGB
  Rgb16,
  /// Pixel is 16-bit RGBA
  Rgba16,

  /// Pixel is 32-bit float RGB
  Rgb32F,
  /// Pixel is 32-bit float RGBA
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

impl ColorType {
  pub fn is_brga8(&self)-> bool {
    match self {
      ColorType::Brga8=> true,
      _=> false
    }
  }
}

#[wasm_bindgen]
pub enum Format {
  /// An Image in PNG Format
  Png,

  /// An Image in JPEG Format
  Jpeg,

  /// An Image in GIF Format
  Gif,

  /// An Image in WEBP Format
  WebP,

  /// An Image in general PNM Format
  Pnm,

  /// An Image in TIFF Format
  Tiff,

  /// An Image in TGA Format
  Tga,

  /// An Image in DDS Format
  Dds,

  /// An Image in BMP Format
  Bmp,

  /// An Image in ICO Format
  Ico,

  /// An Image in Radiance HDR Format
  Hdr,

  /// An Image in OpenEXR Format
  OpenExr,

  /// An Image in farbfeld Format
  Farbfeld,

  /// An Image in AVIF format.
  Avif,

  /// An Image in QOI format.
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

pub(crate) fn to_res<T>(err: Result<T,impl std::fmt::Display>)-> String {
  match err {
    Err(err)=> err.to_string(),
    _=> "".to_owned()
  }
}

