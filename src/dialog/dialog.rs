

use xd_macro::method;
use deno_bindgen::deno_bindgen;

use gtk::{
  Dialog,
  prelude::*,
  gdk::{self, ffi::GdkRectangle}
};
use gdk::ModifierType;


type AccelHandler=extern "C" fn(*const Dialog);

macro_rules! sig_handler_id {
  ($this: ident.$method: ident($f: ident))=> {
    unsafe {
      $this.$method(move |dialog| $f(dialog as *const _)).as_raw()
    }
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
  sig_handler_id!(this.connect_accel_closures_changed(f))
}

#[method]
pub extern "C" fn connect_accept_focus_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_accept_focus_notify(f))
}

#[method]
pub extern "C" fn connect_activate_defaults(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_activate_default(f))
}

#[method]
pub extern "C" fn connect_activate_focus(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_activate_focus(f))
}

#[method]
pub extern "C" fn connect_application_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_application_notify(f))
}

#[method]
pub extern "C" fn connect_border_width_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_border_width_notify(f))
}

#[method]
pub extern "C" fn connect_button_press_event(_this: &Dialog,_f: AccelHandler)-> u64 {
  todo!()
}

#[method]
pub extern "C" fn connect_button_release_event(_this: &Dialog)-> bool {
  todo!()
}

#[method]
pub extern "C" fn connect_can_activate_accel(this: &Dialog,f: extern "C" fn(*const Dialog,u32)-> bool)-> u64 {
  unsafe {
    this.connect_can_activate_accel(move|dialog,u| f(dialog as *const _,u)).as_raw()
  }
}

#[method]
pub extern "C" fn connect_can_default_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_can_default_notify(f))
}

#[method]
pub extern "C" fn connect_can_focus_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_can_focus_notify(f))
}

#[method]
pub extern "C" fn connect_check_resize(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_check_resize(f))
}

#[method]
pub extern "C" fn connect_close(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_close(f))
}

#[method]
pub extern "C" fn connect_composite_child_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_composite_child_notify(f))
}

#[method]
pub extern "C" fn connect_decorated_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_decorated_notify(f))
}

#[method]
pub extern "C" fn connect_default_height_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_default_height_notify(f))
}

#[method]
pub extern "C" fn connect_default_width_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_default_width_notify(f))
}

#[method]
pub extern "C" fn connect_destroy(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_destroy(f))
}

#[method]
pub extern "C" fn connect_destroy_with_parent_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_destroy_with_parent_notify(f))
}

#[method]
pub extern "C" fn connect_events_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_events_notify(f))
}

#[method]
pub extern "C" fn connect_focus_on_click_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_focus_on_click_notify(f))
}

#[method]
pub extern "C" fn connect_focus_on_map_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_focus_on_map_notify(f))
}

#[method]
pub extern "C" fn connect_focus_visible_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_focus_visible_notify(f))
}

#[method]
pub extern "C" fn connect_grab_focus(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_grab_focus(f))
}

#[method]
pub extern "C" fn connect_halign_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_halign_notify(f))
}

#[method]
pub extern "C" fn connect_height_request_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_height_request_notify(f))
}

#[method]
pub extern "C" fn connect_hexpand_set_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_hexpand_notify(f))
}

#[method]
pub extern "C" fn connect_is_focus_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_is_focus_notify(f))
}

#[method]
pub extern "C" fn connect_margin_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_margin_notify(f))
}

#[method]
pub extern "C" fn connect_margin_bottom_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_margin_bottom_notify(f))
}

#[method]
pub extern "C" fn connect_margin_end_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_margin_end_notify(f))
}

#[method]
pub extern "C" fn connect_margin_start_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_margin_start_notify(f))
}

#[method]
pub extern "C" fn connect_margin_top_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_margin_top_notify(f))
}

#[method]
pub extern "C" fn connect_name_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_name_notify(f))
}

#[method]
pub extern "C" fn connect_no_show_all_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_no_show_all_notify(f))
}

#[method]
pub extern "C" fn connect_opacity_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_opacity_notify(f))
}

#[method]
pub extern "C" fn connect_parent_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_parent_notify(f))
}

#[method]
pub extern "C" fn connect_receives_default_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_receives_default_notify(f))
}

#[method]
pub extern "C" fn connect_scale_factor_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_scale_factor_notify(f))
}

#[method]
pub extern "C" fn connect_sensitive_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_sensitive_notify(f))
}

#[method]
pub extern "C" fn connect_tooltip_markup_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_tooltip_markup_notify(f))
}

#[method]
pub extern "C" fn connect_tooltip_text_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_tooltip_text_notify(f))
}

#[method]
pub extern "C" fn connect_valign_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_valign_notify(f))
}

#[method]
pub extern "C" fn connect_vexpand_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_vexpand_notify(f))
}

#[method]
pub extern "C" fn connect_vexpand_set_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_vexpand_set_notify(f))
}

#[method]
pub extern "C" fn connect_visible_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_visible_notify(f))
}

#[method]
pub extern "C" fn connect_width_request_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_width_request_notify(f))
}

#[method]
pub extern "C" fn connect_window_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_window_notify(f))
}

#[method]
pub extern "C" fn connect_hide(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_hide(f))
}

#[method]
pub extern "C" fn connect_map(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_map(f))
}

#[method]
pub extern "C" fn connect_realize(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_realize(f))
}

#[method]
pub extern "C" fn connect_show(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_show(f))
}

#[method]
pub extern "C" fn connect_style_updated(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_style_updated(f))
}

#[method]
pub extern "C" fn connect_unmap(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_unmap(f))
}

#[method]
pub extern "C" fn connect_unrealize(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_unrealize(f))
}

#[method]
pub extern "C" fn connect_app_paintable_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_app_paintable_notify(f))
}

#[method]
pub extern "C" fn connect_expand_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_expand_notify(f))
}

#[method]
pub extern "C" fn connect_has_default_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_has_default_notify(f))
}

#[method]
pub extern "C" fn connect_has_focus_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_has_focus_notify(f))
}

#[method]
pub extern "C" fn connect_has_tooltip_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_has_tooltip_notify(f))
}

#[method]
pub extern "C" fn connect_hexpand_notify(this: &Dialog,f: AccelHandler)-> u64 {
  sig_handler_id!(this.connect_hexpand_notify(f))
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


//f
#[method]
pub extern "C" fn fullscreen(this: &Dialog) {
  this.fullscreen()
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


#[method]
pub extern "C" fn has_tooltip(this: &Dialog)-> bool {
  this.has_tooltip()
}

#[method]
pub extern "C" fn has_window(this: &Dialog)-> bool {
  this.has_window()
}

#[method]
pub extern "C" fn has_default(this: &Dialog)-> bool {
  this.has_default()
}

#[method]
pub extern "C" fn has_focus(this: &Dialog)-> bool {
  this.has_focus()
}

#[method]
pub extern "C" fn has_grab(this: &Dialog)-> bool {
  this.has_grab()
}

#[method]
pub extern "C" fn has_screen(this: &Dialog)-> bool {
  this.has_screen()
}

#[method]
pub extern "C" fn has_visible_focus(this: &Dialog)-> bool {
  this.has_visible_focus()
}

#[method]
pub fn height(this: &Dialog)-> i32 {
  this.height_request()
}

#[method]
pub extern "C" fn hexpands(this: &Dialog)-> bool {
  this.hexpands()
}

#[method]
pub extern "C" fn halign(_this: &Dialog) {
  todo!()
}

#[method]
pub fn hide(this: &Dialog) {
  this.hide()
}

#[method]
pub extern "C" fn hide_on_delete(this: &Dialog)-> bool {
  this.hide_on_delete().0
}


//i
#[method]
pub extern "C" fn is_app_paintable(this: &Dialog)-> bool {
  this.is_app_paintable()
}

#[method]
pub extern "C" fn is_child_visible(this: &Dialog)-> bool {
  this.is_child_visible()
}

#[method]
pub extern "C" fn is_double_buffered(this: &Dialog)-> bool {
  this.is_double_buffered()
}

#[method]
pub extern "C" fn is_hexpand_set(this: &Dialog)-> bool {
  this.is_hexpand_set()
}

#[method]
pub extern "C" fn is_mapped(this: &Dialog)-> bool {
  this.is_mapped()
}

#[method]
pub extern "C" fn is_no_show_all(this: &Dialog)-> bool {
  this.is_no_show_all()
}

#[method]
pub extern "C" fn is_realized(this: &Dialog)-> bool {
  this.is_realized()
}

#[method]
pub extern "C" fn is_vexpand_set(this: &Dialog)-> bool {
  this.is_vexpand_set()
}

#[method]
pub extern "C" fn is_drawable(this: &Dialog)-> bool {
  this.is_drawable()
}

#[method]
pub extern "C" fn is_focus(this: &Dialog)-> bool {
  this.is_focus()
}

#[method]
pub extern "C" fn is_sensitive(this: &Dialog)-> bool {
  this.is_sensitive()
}

#[method]
pub extern "C" fn is_toplevel(this: &Dialog)-> bool {
  this.is_toplevel()
}

#[method]
pub extern "C" fn is_visible(this: &Dialog)-> bool {
  this.is_visible()
}

#[method]
pub extern "C" fn is_composite_child(this: &Dialog)-> bool {
  this.is_composite_child()
}


//m
#[method]
pub extern "C" fn mnemonic_activate(this: &Dialog,keyval: u32,modifier_bits: u32)-> bool {
  GtkWindowExt::mnemonic_activate(this,keyval,ModifierType::from_bits_truncate(modifier_bits))
}

#[method]
pub extern "C" fn must_destroy_with_parent(this: &Dialog)-> bool {
  this.must_destroy_with_parent()
}

//p
#[method]
pub extern "C" fn propagate_key_event(_this: &Dialog)-> bool {
  todo!()
}


//s
#[method]
pub extern "C" fn skips_pager_hint(this: &Dialog)-> bool {
  this.skips_pager_hint()
}

#[method]
pub extern "C" fn skips_taskbar_hint(this: &Dialog)-> bool {
  this.skips_taskbar_hint()
}





