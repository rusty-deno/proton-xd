use std::{
  slice,
  str,
  fmt::Display
};

type ThrowFn=unsafe extern "C" fn(*const u8,usize)-> !;
static mut THROW: ThrowFn=default_throw;

unsafe extern "C" fn default_throw(buff: *const u8,len: usize)-> ! {
  let xd=str::from_utf8_unchecked(slice::from_raw_parts(buff,len));
  panic!("{xd}")
}

#[no_mangle]
pub unsafe fn set_throw(f: ThrowFn) {
  THROW=f
}

pub(crate) trait Exception<T> {
  fn unwrap_or_throw(self)-> T;
  fn except(self,msg: &str)-> T;
}

pub(crate) fn throw(msg: &str)-> ! {
  unsafe {
    THROW(msg.as_ptr(),msg.len());
  }
}

impl<T,E: Display> Exception<T> for Result<T,E> {
  fn unwrap_or_throw(self)-> T {
    match self {
      Ok(res)=> res,
      Err(err)=> throw(&err.to_string())
    }
  }

  fn except(self,msg: &str)-> T {
    match self {
      Ok(res)=> res,
      _=> throw(msg)
    }
  }
}

impl<T> Exception<T> for Option<T> {
  fn unwrap_or_throw(self)-> T {
    match self {
      Some(val)=> val,
      _=> throw("null pointer exception")
    }
  }

  fn except(self,msg: &str)-> T {
    match self {
      Some(res)=> res,
      _=> throw(msg)
    }
  }
}

