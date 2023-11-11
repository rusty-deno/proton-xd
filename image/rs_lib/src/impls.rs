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
    let _xd=self.iter();

    for byte in self.iter().step_by(4) {
      unsafe {
        let ptr=byte.to_mut_ptr();
        ptr::swap(ptr,ptr.offset(2));
        ptr::replace(ptr.offset(3),u8::MAX);
      }
    }
  }
}


pub(crate) trait ToMutPtr: Sized {
  fn to_mut_ptr(&self)-> *mut Self {
    self as *const Self as *mut Self
  }

  fn as_mut_ptr(&mut self)-> *mut Self {
    self as *mut Self
  }
}
impl<S> ToMutPtr for S {}





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


