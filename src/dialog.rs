use deno_bindgen::deno_bindgen;
use crate::ffi::to_str;
use native_dialog::{
  MessageDialog,
  MessageType::{
    Error,
    Info,
    Warning,
    self,
  }
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
  dialog(title,message,typ);
}

#[no_mangle]
pub extern "C" fn confirm(text: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(text),to_str(title),typ).show_confirm().unwrap_or(false)
}

#[deno_bindgen]
pub fn alert_sync(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ);
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
