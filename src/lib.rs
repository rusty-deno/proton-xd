mod xd;
mod screencapture;
mod dialog;
mod thread;
mod ffi;
mod convert;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;
pub use convert::*;



#[cfg(test)]
mod tests {
  use deno_bindgen::serde_json::from_str;
  use crate::Icon;


  #[test]
  fn xd() {
    let _icon: Icon=from_str("xd").unwrap();
    let _icon1: Icon=from_str(r#"{ "rgba": [],"height": 69,"width": 69 }"#).unwrap();
  }
}
