pub mod xd;
pub mod screencapture;
pub mod dialog;
pub mod thread;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;




#[cfg(test)]
mod tests {
  use std::collections::HashMap;

  
  #[test]
  fn xd() {
    let map: HashMap<String,u8>=HashMap::from_iter([
      (String::from("xd"),69)
    ]);

    map.get("xd");




  }


}