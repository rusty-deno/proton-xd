use core::panic;

use deno_bindgen::deno_bindgen;
use serde_json::from_str;
use crate::ffi::to_str;
use native_dialog::{
  MessageDialog,
  MessageType::{
    Error,
    Info,
    Warning,
    self,
  },
  FileDialog
};

pub fn dialog<'a>(title: &'a str,message: &'a str,typ: u8)-> MessageDialog<'a> {
  MessageDialog::new().set_title(title).set_text(message).set_type(get_typ(typ))
}

fn get_typ(typ: u8)-> MessageType {
  match typ {
    1=> Warning,
    2=> Error,
    _=> Info
  }
}




#[deno_bindgen(non_blocking)]
pub fn alert(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ).show_alert().unwrap_or(());
}

#[no_mangle]
pub extern "C" fn confirm(text: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(text),to_str(title),typ).show_confirm().unwrap_or(false)
}

#[deno_bindgen]
pub fn alert_sync(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ).show_alert().unwrap_or(());
}

#[no_mangle]
pub extern "C" fn confirm_sync(text: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(text),to_str(title),typ).show_confirm().unwrap_or(false)
}



//todo
// #[deno_bindgen]
// pub fn progress()-> String {
//   todo!()
// }

//todo
// #[deno_bindgen]
// pub fn prompt(_query: &str)-> String {
//   todo!()
// }

//todo
// #[deno_bindgen]
// pub fn calender(_title: &str)-> String {
//   todo!()
// }

#[deno_bindgen]
pub struct FileDialogOptions {
  pub location: String,
  pub filename: String,
  pub typ: FileOpenerType,
}

#[deno_bindgen]
pub enum FileOpenerType {
  SingleFile,
  SingleDir,
  MultipleFile
}

impl FileOpenerType {
  pub fn show(self,dialog: FileDialog)-> String {
    match self {
      FileOpenerType::SingleFile=> dialog.show_open_single_file(),
      FileOpenerType::SingleDir=> dialog.show_open_single_dir(),
      _=> panic!("not supported")
    }.unwrap().unwrap_or_default().to_str().unwrap_or_default().to_string()
  }
  
}


#[deno_bindgen]
pub fn open_single(options: &str)-> String {
  let opt: FileDialogOptions=from_str(options).unwrap();
  let file_dialog=FileDialog::new()
  .set_filename(&opt.filename)
  .set_location(&opt.location);

  opt.typ.show(file_dialog)
}
