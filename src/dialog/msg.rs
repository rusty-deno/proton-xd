
use std::mem;
use xd_macro::method;
use deno_bindgen::deno_bindgen;
use crate::exception::Exception;

use native_dialog::{
  MessageDialog,
  MessageType
};


fn to_msg_type(msg_type: u8)-> MessageType {
  match msg_type {
    1=> MessageType::Warning,
    2=> MessageType::Error,
    _=> MessageType::Info
  }
}


#[deno_bindgen]
pub fn new_msg_dialog()-> usize {
  Box::into_raw(Box::new(MessageDialog::new())) as _
}

#[method]
pub fn msg_dialog_reset_owner(this: &mut MessageDialog) {
  *this=mem::take(this).reset_owner()
}

#[method]
pub fn msg_dialog_set_text(this: &mut MessageDialog,text: &str) {
  *this=mem::take(this).set_text(text)
}

#[method]
pub fn msg_dialog_set_title(this: &mut MessageDialog,title: &str) {
  *this=mem::take(this).set_title(title)
}

#[method]
pub fn msg_dialog_xd(this: &mut MessageDialog,msg_type: u8) {
  *this=mem::take(this).set_type(to_msg_type(msg_type))
}


#[method]
pub fn msg_dialog_show_alert(this: MessageDialog) {
  this.show_alert().unwrap_or_throw()
}

#[method]
pub extern "C" fn msg_dialog_show_confirm(this: MessageDialog)-> bool {
  this.show_confirm().unwrap_or_throw()
}


