mod xd;
mod thread;
mod dialog;
mod exception;
mod screencapture;


pub use xd::*;
pub use thread::*;
pub use dialog::*;
pub use screencapture::*;

pub(crate) use exception::*;


#[no_mangle]
pub extern "C" fn free(ptr: *mut u8) {
  drop(unsafe { Box::from_raw(ptr) })
}



