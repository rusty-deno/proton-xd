mod xd;
mod screencapture;
mod dialog;
mod thread;
mod ffi;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;

pub(crate) type ThrowFn=unsafe extern "C" fn(*const u8,len: usize)-> !;
pub(crate) static mut THROW: ThrowFn=default_throw;

unsafe extern "C" fn default_throw(buff: *const u8,len: usize)-> ! {
  let xd=std::str::from_utf8_unchecked(std::slice::from_raw_parts(buff,len));
  panic!("{xd}")
}

#[no_mangle]
pub unsafe fn set_throw(f: ThrowFn) {
  THROW=f
}


