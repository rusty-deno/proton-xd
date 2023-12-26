

use xd_macro::method;
use deno_bindgen::deno_bindgen;

use gtk::{
  Dialog,
  prelude::*,
  gdk::{self, ffi::GdkRectangle}
};
use gdk::ModifierType;


type AccelHandler=extern "C" fn(*const Dialog);

macro_rules! closure {
  ($f:ident)=> {
    move |dialog| $f(dialog as *const _)
  };
}


#[deno_bindgen]
pub fn new_dialog()-> usize {
  Box::into_raw(Box::new(Dialog::new())) as usize
}

//a
#[method]
pub extern "C" fn accepts_focus(this: &Dialog)-> bool {
  this.accepts_focus()
}

#[method]
pub extern "C" fn activate(this: &Dialog)-> bool {
  this.activate()
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
pub extern "C" fn accessible(this: &Dialog)-> bool {
  this.accessible().is_some()// fix return type
}

#[method]
pub fn action_group(this: &Dialog,prefix: &str) {
  this.action_group(prefix);// fix return type
}

#[method]
pub extern "C" fn add_button(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn allocation(this: &Dialog)-> *mut GdkRectangle {// rectangle
  this.allocation().as_ptr()
}

#[method]
pub fn allocated_baseline(this: &Dialog)-> i32 {
  this.allocated_baseline()
}

#[method]
pub fn allocated_height(this: &Dialog)-> i32 {
  this.allocated_height()
}

#[method]
pub fn allocated_width(this: &Dialog)-> i32 {
  this.allocated_width()
}

//b
#[method]
pub fn begin_move_drag(this: &Dialog,button: i32,root_x: i32,root_y: i32,timestamp: u32) {
  this.begin_move_drag(button,root_x,root_y,timestamp)
}

#[method]
pub fn begin_resize_drag(_this: &Dialog) {
  todo!()
}


//c
#[method]
pub extern "C" fn can_activate_accel(this: &Dialog,signal_id: u32)-> bool {
  this.can_activate_accel(signal_id)
}

#[method]
pub extern "C" fn can_default(this: &Dialog)-> bool {
  this.can_default()
}

#[method]
pub extern "C" fn can_focus(this: &Dialog)-> bool {
  this.can_focus()
}

#[method]
pub extern "C" fn child_focus(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn compute_expand(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub fn child_notify(this: &Dialog,child_property: &str) {
  gtk::prelude::WidgetExt::child_notify(this,child_property)
}

#[method]
pub extern "C" fn clip(this: &Dialog)-> *mut GdkRectangle {// rectangle
  this.clip().as_ptr()
}

#[method]
pub fn close(this: &Dialog) {
  this.close()
}

#[method]
pub extern "C" fn connect_accel_closures_changed(this: &Dialog,f: AccelHandler)-> u64 {
  unsafe {
    this.connect_accel_closures_changed(closure!(f)).as_raw()
  }
}

#[method]
pub extern "C" fn connect_accept_focus_notify(this: &Dialog,f: AccelHandler)-> u64 {
  unsafe {
    this.connect_accept_focus_notify(closure!(f)).as_raw()
  }
}

#[method]
pub extern "C" fn connect_activate_defaults(this: &Dialog,f: AccelHandler)-> u64 {
  unsafe {
    this.connect_activate_default(closure!(f)).as_raw()
  }
}

#[method]
pub extern "C" fn connect_activate_focus(this: &Dialog,f: AccelHandler)-> u64 {
  unsafe {
    this.connect_activate_focus(closure!(f)).as_raw()
  }
}









//d

#[method]
pub extern "C" fn drag_check_threshold(this: &Dialog,start_x: i32,start_y: i32,current_x: i32,current_y: i32)-> bool {
  this.drag_check_threshold(start_x,start_y,current_x,current_y)
}

#[method]
pub extern "C" fn drag_dest_get_track_motion(this: &Dialog)-> bool {
  this.drag_dest_get_track_motion()
}

#[method]
pub fn default_height(this: &Dialog)-> i32 {
  this.default_height()
}

#[method]
pub fn default_width(this: &Dialog)-> i32 {
  this.default_width()
}

#[method]
pub extern "C" fn default_size(this: &Dialog) {// size (i32,i32)
  this.default_size();
}

#[method]
pub extern "C" fn default_widget(_this: &Dialog) {//widget
  todo!()
}

#[method]
pub fn deiconify(this: &Dialog) {
  this.deiconify()
}

#[method]
pub fn direction(this: &Dialog)-> String {
  this.direction().to_string()
}

//e
#[method]
pub extern "C" fn emit_enable_debugging(this: &Dialog,toggle: bool)-> bool {
  this.emit_enable_debugging(toggle)
}

#[method]
pub extern "C" fn emit_popup_menu(this: &Dialog)-> bool {
  this.emit_popup_menu()
}

#[method]
pub extern "C" fn emit_show_help(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn event(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn expands(this: &Dialog)-> bool {
  this.expands()
}

#[method]
fn emit_activate_default(this: &Dialog) {
  this.emit_activate_default()
}

#[method]
fn emit_activate_focus(this: &Dialog) {
  this.emit_activate_focus()
}

#[method]
fn emit_grab_focus(this: &Dialog) {
  this.emit_grab_focus()
}

#[method]
pub extern "C" fn emit_move_focus(_this: &Dialog)-> bool {
  todo!()
}

#[method]
fn error_bell(this: &Dialog) {
  this.error_bell()
}


//g

#[method]
pub extern "C" fn get_sensitive(this: &Dialog)-> bool {
  this.get_sensitive()
}

#[method]
pub extern "C" fn get_visible(this: &Dialog)-> bool {
  this.get_visible()
}

#[method]
pub extern "C" fn gets_focus_on_click(this: &Dialog)-> bool {
  this.gets_focus_on_click()
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
pub fn grab_add(this: &Dialog) {
  this.grab_add()
}

#[method]
pub fn grab_default(this: &Dialog) {
  this.grab_default()
}

#[method]
pub fn grab_focus(this: &Dialog) {
  this.grab_focus()
}

#[method]
pub fn grab_remove(this: &Dialog) {
  this.grab_remove()
}

#[method]
pub fn gravity(this: &Dialog) {//gravity
  this.gravity();
}

//h
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

//i
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
  GtkWindowExt::mnemonic_activate(this,keyval,ModifierType::from_bits_truncate(modifier_bits))
}

#[method]
pub extern "C" fn must_destroy_with_parent(this: &Dialog)-> bool {
  this.must_destroy_with_parent()
}

#[method]
pub extern "C" fn propagate_key_event(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn skips_pager_hint(this: &Dialog)-> bool {
  this.skips_pager_hint()
}

#[method]
pub extern "C" fn skips_taskbar_hint(this: &Dialog)-> bool {
  this.skips_taskbar_hint()
}





