
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
pub fn file_dialog_add_filter(this: &mut FileDialog,description: &str,extensions: &str) {
  let extensions=serde_json::from_str::<Box<[&str]>>(extensions).unwrap_or_throw();
  *this=mem::take(this).add_filter(description,&extensions);
}

#[method]
pub fn file_dialog_remove_all_filters(this: &mut FileDialog) {
  *this=mem::take(this).remove_all_filters();
}

#[method]
pub fn file_dialog_reset_filename(this: &mut FileDialog) {
  *this=mem::take(this).reset_filename();
}

#[method]
pub fn file_dialog_reset_location(this: &mut FileDialog) {
  *this=mem::take(this).reset_location();
}

#[method]
pub fn file_dialog_reset_owner(this: &mut FileDialog) {
  *this=mem::take(this).reset_owner();
}

#[method]
pub fn file_dialog_set_filename(this: &mut FileDialog,filename: &str) {
  *this=mem::take(this).set_filename(filename);
}

#[method]
pub fn file_dialog_set_location(this: &mut FileDialog,path: &str) {
  *this=mem::take(this).set_location(path)
}


#[method]
pub fn file_dialog_set_title(this: &mut FileDialog,title: &str) {
  *this=mem::take(this).set_title(title);
}

#[method]
pub fn file_dialog_show_open_multiple_file(this: FileDialog)-> String {
  this.show_open_multiple_file().unwrap_or_throw()
  .into_iter()
  .map(|path| path.to_string_lossy().to_string())
  .collect::<Vec<_>>()
  .join(",")
}

#[method]
pub fn file_dialog_show_open_single_dir(this: FileDialog)-> String {
  this.show_open_single_dir()
  .unwrap_or_throw()
  .unwrap_or_throw()
  .to_string_lossy()
  .to_string()
}

#[method]
pub fn file_dialog_show_open_single_file(this: FileDialog)-> String {
  this.show_open_single_file().unwrap_or_throw()
  .unwrap_or_throw()
  .to_string_lossy()
  .to_string()
}

#[method]
pub fn file_dialog_show_save_single_file(this: FileDialog)-> String {
  this.show_save_single_file().unwrap_or_throw()
  .unwrap_or_throw()
  .to_string_lossy()
  .to_string()
}







