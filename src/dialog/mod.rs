
use deno_bindgen::deno_bindgen;

use gtk::{
  Dialog,
  prelude::GtkWindowExt
};



#[deno_bindgen]
pub fn new_dialog()-> usize {
  Box::into_raw(Box::new(Dialog::new())) as usize
}


fn _accepts_focus(this: &Dialog)-> bool {
  this.accepts_focus()
}




