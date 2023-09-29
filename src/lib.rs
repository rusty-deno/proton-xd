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
  #[deno_bindgen::deno_bindgen]
  #[derive(Debug)]
  struct XD {
    xd: Option<u8>
  }

  #[test]
  fn xd() {
    let xd: XD=deno_bindgen::serde_json::from_str(r#"{}"#).unwrap();
    println!("{:?}",xd)
  }
}