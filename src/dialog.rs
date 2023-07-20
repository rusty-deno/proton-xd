

use deno_bindgen::deno_bindgen;
use native_dialog::{
  MessageDialog,
  MessageType::{
    Error,
    Info,
    Warning,
    self,
  }
};

use crate::ffi::to_str;

#[cfg(test)]
mod tests {
  
  #[test]
  fn xd() {
    
  }

}

fn dialog<'a>(title: &'a str,message: &'a str,typ: u8)-> MessageDialog<'a> {
  MessageDialog::new().set_title(title).set_text(message).set_type(get_typ(typ))
}

fn get_typ(typ: u8)-> MessageType {
  match typ {
    1=> Warning,
    2=> Error,
    _=> Info
  }
}




#[deno_bindgen]
pub fn message(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ);
}

#[no_mangle]
pub extern "C" fn message_cfm(message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(message),typ).show_confirm().unwrap_or(false)
}



#[deno_bindgen]
pub fn error(error_message: &str,title: &str,typ: u8) {
  dialog(title,error_message,typ).show_alert().unwrap_or(());
}

#[no_mangle]
pub extern "C" fn error_cfm(error_message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(error_message),typ).show_confirm().unwrap_or(false)
}



#[deno_bindgen]
pub fn info(info: &str,title: &str,typ: u8) {
  dialog(title,info,typ).show_alert().unwrap_or(());
}

#[no_mangle]
pub extern "C" fn info_cfm(info: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(info),typ).show_confirm().unwrap_or(false)
}


#[deno_bindgen]
pub fn warning(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ).show_alert().unwrap_or(());
}

#[no_mangle]
pub extern "C" fn warning_cfm(message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(message),typ).show_confirm().unwrap_or(false)
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
