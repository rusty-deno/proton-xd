
use std::mem;
use deno_bindgen::*;
use xd_macro::method;
use native_dialog::FileDialog;
use crate::exception::Exception;



#[deno_bindgen]
pub fn new_file_dialog()-> usize {
  Box::into_raw(Box::new(FileDialog::new())) as _
}

#[method]
pub fn add_filter(this: &mut FileDialog,description: &str,extensions: &str) {
  let extensions=serde_json::from_str::<Box<[&str]>>(extensions).unwrap_or_throw();
  *this=mem::take(this).add_filter(description,&extensions);
}

#[method]
pub fn remove_all_filters(this: &mut FileDialog) {
  *this=mem::take(this).remove_all_filters();
}

#[method]
pub fn reset_filename(this: &mut FileDialog) {
  *this=mem::take(this).reset_filename();
}

#[method]
pub fn reset_location(this: &mut FileDialog) {
  *this=mem::take(this).reset_location();
}

#[method]
pub fn reset_owner(this: &mut FileDialog) {
  *this=mem::take(this).reset_owner();
}

#[method]
pub fn set_filename(this: &mut FileDialog,filename: &str) {
  *this=mem::take(this).set_filename(filename);
}

#[method]
pub fn set_location(this: &mut FileDialog,path: &str) {
  *this=mem::take(this).set_location(path)
}








