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


#[deno_bindgen::deno_bindgen]
pub fn free(ptr: usize) {
  drop(unsafe { Box::from_raw(ptr as *mut u8) })
}



