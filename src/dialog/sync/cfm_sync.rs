use crate::{
  dialog,
  ffi::to_str
};

#[no_mangle]
pub extern "C" fn error_cfm_sync(error_message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(error_message),typ).show_confirm().unwrap_or(false)
}

#[no_mangle]
pub extern "C" fn message_cfm_sync(message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(message),typ).show_confirm().unwrap_or(false)
}

#[no_mangle]
pub extern "C" fn info_cfm_sync(info: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(info),typ).show_confirm().unwrap_or(false)
}

#[no_mangle]
pub extern "C" fn warning_cfm_sync(message: *const i8,title: *const i8,typ: u8)-> bool {
  dialog(to_str(title),to_str(message),typ).show_confirm().unwrap_or(false)
}