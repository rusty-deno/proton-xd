

use xd_macro::method;
use deno_bindgen::deno_bindgen;

use gtk::{
  Dialog,
  prelude::GtkWindowExt,
  gdk
};
use gdk::ModifierType;



#[deno_bindgen]
pub fn new_dialog()-> usize {
  Box::into_raw(Box::new(Dialog::new())) as usize
}

#[method]
pub extern "C" fn accepts_focus(this: &Dialog)-> bool {
  this.accepts_focus()
}

#[method]
pub extern "C" fn activate_default(this: &Dialog)-> bool {
  this.activate_default()
}

#[method]
pub extern "C" fn activate_focus(this: &Dialog)-> bool {
  this.activate_focus()
}

#[method]
pub extern "C" fn activate_key(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn emit_enable_debugging(this: &Dialog,toggle: bool)-> bool {
  this.emit_enable_debugging(toggle)
}

#[method]
pub extern "C" fn gets_focus_on_map(this: &Dialog)-> bool {
  this.gets_focus_on_map()
}

#[method]
pub extern "C" fn gets_focus_visible(this: &Dialog)-> bool {
  this.gets_focus_visible()
}

#[method]
pub extern "C" fn has_group(this: &Dialog)-> bool {
  this.has_group()
}

#[method]
pub extern "C" fn has_toplevel_focus(this: &Dialog)-> bool {
  this.has_toplevel_focus()
}

#[method]
pub extern "C" fn hides_titlebar_when_maximized(this: &Dialog)-> bool {
  this.hides_titlebar_when_maximized()
}

#[method]
pub extern "C" fn is_active(this: &Dialog)-> bool {
  this.is_active()
}

#[method]
pub extern "C" fn is_decorated(this: &Dialog)-> bool {
  this.is_decorated()
}

#[method]
pub extern "C" fn is_deletable(this: &Dialog)-> bool {
  this.is_deletable()
}

#[method]
pub extern "C" fn is_maximized(this: &Dialog)-> bool {
  this.is_maximized()
}

#[method]
pub extern "C" fn is_mnemonics_visible(this: &Dialog)-> bool {
  this.is_mnemonics_visible()
}

#[method]
pub extern "C" fn is_modal(this: &Dialog)-> bool {
  this.is_modal()
}

#[method]
pub extern "C" fn is_resizable(this: &Dialog)-> bool {
  this.is_resizable()
}

#[method]
pub extern "C" fn is_urgency_hint(this: &Dialog)-> bool {
  this.is_urgency_hint()
}

#[method]
pub extern "C" fn mnemonic_activate(this: &Dialog,keyval: u32,modifier_bits: u32)-> bool {
  this.mnemonic_activate(keyval,ModifierType::from_bits_truncate(modifier_bits))
}

#[method]
pub extern "C" fn must_destroy_with_parent(this: &Dialog)-> bool {
  this.must_destroy_with_parent()
}






