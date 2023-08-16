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
  
  #[test]
  fn xd() {
    let mut xd: u8=68;
    let ptr=Box::new(&mut xd);
    ptr.checked_add(1).unwrap();
    println!("{xd}");
  }

}
