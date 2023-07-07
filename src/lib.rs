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
  use std::collections::LinkedList;

  #[test]
  fn xd() {
    let _map=LinkedList::from([
      9
    ]);
    
    

  }


}