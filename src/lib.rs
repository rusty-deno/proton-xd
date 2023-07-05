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
    let mut _xd: LinkedList<u8>=LinkedList::new();
    
    
    

  }


}

fn _f(mut _x: impl Iterator) {
  



}