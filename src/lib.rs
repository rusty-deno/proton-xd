pub mod xd;
pub mod screencapture;
pub mod dialog;
pub mod thread;
pub mod ffi;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;

// extern crate hashbrown;



#[cfg(test)]
mod tests {
  use std::collections::HashMap;
  
  #[test]
  fn xd() {
    let mut xd: HashMap<String,u8>=HashMap::new();

    xd.insert("xd".to_string(),69);






  }


}