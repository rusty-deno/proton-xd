use std::ptr;
use image::codecs::png::{CompressionType, FilterType};


pub(crate) trait ToRgba {
  fn to_rgba8(&self);
  fn to_rgba8_if_needed(&self,is_brga: bool) {
    if is_brga {
      self.to_rgba8();
    }
  }
}

impl<S: std::ops::Deref<Target=[u8]>> ToRgba for S {
  fn to_rgba8(&self) {
    for byte in self.iter().step_by(4) {
      unsafe {
        let ptr=byte as *const u8 as *mut u8;
        ptr::swap(ptr,ptr.offset(2));
        ptr::replace(ptr.offset(3),u8::MAX);
      }
    }
  }
}


pub(crate) trait Enum<T> {
  fn into_enum(self)-> T;
}

impl Enum<CompressionType> for u8 {
  fn into_enum(self)-> CompressionType {
    use CompressionType::*;
    match self {
      1=> Fast,
      2=> Best,
      _=> Default
    }
  }
}

impl Enum<FilterType> for u8 {
  fn into_enum(self)-> FilterType {
    use FilterType::*;
    match self {
      1=> Sub,
      2=> Up,
      3=> Avg,
      4=> Paeth,
      5=> Adaptive,
      _=> NoFilter,
    }
  }
}


