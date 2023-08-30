pub mod xd;
pub mod screencapture;
pub mod dialog;
pub mod thread;
pub mod ffi;
pub mod convert;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;
pub use convert::*;


#[cfg(test)]
mod tests {


  #[test]
  fn xd() {
    let xd: Option<u8>=Some(69);
    xd.unwrap();
  }

}