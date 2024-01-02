
use xd_macro::method;
use deno_bindgen::deno_bindgen;

use crate::{
  exception::Exception,
  stringify
};

use wry::application::window::{
  Window,
  UserAttentionType,
  Theme
};




#[method]
pub fn cursor_position(this: &Window)-> String {
  stringify! { this.cursor_position().unwrap_or_throw() }
}

#[method]
pub fn drag_window(this: &Window) {
  this.drag_window().unwrap_or_throw()
}

#[method]
pub fn inner_position(this: &Window)-> String {
  stringify! { this.inner_position().unwrap_or_throw() }
}

#[method]
pub unsafe extern "C" fn is_closable(this: &Window)-> bool {
  this.is_closable()
}

#[method]
pub unsafe extern "C" fn is_decorated(this: &Window)-> bool {
  this.is_decorated()
}

#[method]
pub unsafe extern "C" fn is_focused(this: &Window)-> bool {
  this.is_focused()
}

#[method]
pub unsafe extern "C" fn is_maximizable(this: &Window)-> bool {
  this.is_maximizable()
}

#[method]
pub unsafe extern "C" fn is_maximized(this: &Window)-> bool {
  this.is_maximized()
}

#[method]
pub unsafe extern "C" fn is_minimizable(this: &Window)-> bool {
  this.is_minimizable()
}

#[method]
pub unsafe extern "C" fn is_minimized(this: &Window)-> bool {
  this.is_minimized()
}

#[method]
pub unsafe extern "C" fn is_resizable(this: &Window)-> bool {
  this.is_resizable()
}

#[method]
pub unsafe extern "C" fn is_visible(this: &Window)-> bool {
  this.is_visible()
}


#[method]
pub fn outer_position(this: &Window)-> String {
  stringify! { this.outer_position().unwrap_or_throw() }
}

#[method]
pub fn outer_size(this: &Window)-> String {
  stringify! { this.outer_size() }
}

#[method]
pub fn request_redraw(this: &Window) {
  this.request_redraw()
}

#[method]
pub fn request_user_attention(this: &Window,request_type: u8) {
  this.request_user_attention(Some(
    match request_type {
      1=> UserAttentionType::Informational,
      _=> UserAttentionType::Critical
    }
  ))
}

#[method]
pub fn scale_factor(this: &Window)-> f64 {
  this.scale_factor()
}

#[method]
pub unsafe extern "C" fn theme(this: &Window)-> bool {
  match this.theme() {
    Theme::Light=> false,
    _=> true
  }
}

#[method]
pub fn title(this: &Window)-> String {
  this.title()
}
