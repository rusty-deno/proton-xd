mod xd;
mod thread;
mod exception;
mod screencapture;


pub use xd::*;
pub use thread::*;
pub use screencapture::*;

pub(crate) use exception::*;


#[no_mangle]
pub extern "C" fn free(ptr: *mut u8) {
  drop(unsafe { Box::from_raw(ptr) })
}



