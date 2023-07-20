pub mod cfm_sync;
pub use cfm_sync::*;



use deno_bindgen::deno_bindgen;
use crate::dialog;





#[deno_bindgen]
pub fn message_sync(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ);
}

#[deno_bindgen]
pub fn error_sync(error_message: &str,title: &str,typ: u8) {
  dialog(title,error_message,typ).show_alert().unwrap_or(());
}

#[deno_bindgen]
pub fn info_sync(info: &str,title: &str,typ: u8) {
  dialog(title,info,typ).show_alert().unwrap_or(());
}


#[deno_bindgen]
pub fn warning_sync(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ).show_alert().unwrap_or(());
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