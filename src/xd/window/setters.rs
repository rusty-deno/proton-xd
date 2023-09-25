use deno_bindgen::deno_bindgen;
use crate::{
  to_constraints,
  ffi::to_str,
  cast,
};
use wry::application::dpi::{
  PhysicalPosition,
  PhysicalSize
};




#[no_mangle]
pub unsafe extern "C" fn set_always_on_bottom(ptr: usize,always_on_bottom: bool) {
  (*cast(ptr)).set_always_on_bottom(always_on_bottom)
}

#[no_mangle]
pub unsafe extern "C" fn set_always_on_top(ptr: usize,always_on_top: bool) {
  (*cast(ptr)).set_always_on_top(always_on_top)
}


#[no_mangle]
pub unsafe extern "C" fn set_closable(ptr: usize,closable: bool) {
  (*cast(ptr)).set_closable(closable)
}

#[no_mangle]
pub unsafe extern "C" fn set_content_protection(ptr: usize,enabled: bool) {
  (*cast(ptr)).set_content_protection(enabled)
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_grab(ptr: usize,grab: bool) {
  (*cast(ptr)).set_cursor_grab(grab).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_icon(_ptr: usize) {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_position(ptr: usize,x: i32,y: i32) {
  (*cast(ptr)).set_cursor_position(PhysicalPosition::new(x,y)).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_visible(ptr: usize,visible: bool) {
  (*cast(ptr)).set_cursor_visible(visible);
}

#[no_mangle]
pub unsafe extern "C" fn set_decorations(ptr: usize,decorations: bool) {
  (*cast(ptr)).set_decorations(decorations)
}

#[deno_bindgen]
pub fn set_focus(ptr: usize) {
  unsafe {
    (*cast(ptr)).set_focus();
  }
}

#[deno_bindgen]
pub fn set_fullscreen(_ptr: usize,_fullscreen: &str)-> String {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_ignore_cursor_events(ptr: usize,ignore: bool) {
  (*cast(ptr)).set_ignore_cursor_events(ignore).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_ime_position(ptr: usize,x: i32,y: i32) {
  (*cast(ptr)).set_ime_position(PhysicalPosition::new(x,y))
}

#[no_mangle]
pub unsafe extern "C" fn set_inner_size(ptr: usize,height: u32,width: u32) {
  (*cast(ptr)).set_inner_size(PhysicalSize::new(width,height))
}

#[no_mangle]
pub unsafe extern "C" fn set_inner_size_constraints(ptr: usize,min_width: i32,min_height: i32,max_width: i32,max_height: i32) {
  (*cast(ptr)).set_inner_size_constraints(
    to_constraints(
      min_width.into(),
      min_height.into(),
      max_width.into(),
      max_height.into()
    )
  )
}

#[no_mangle]
pub unsafe extern "C" fn set_max_inner_size(ptr: usize,height: u32,width: u32) {
  (*cast(ptr)).set_max_inner_size(Some(PhysicalSize::new(width,height)))
}

#[no_mangle]
pub unsafe extern "C" fn set_maximizable(ptr: usize,maximizable: bool) {
  (*cast(ptr)).set_maximizable(maximizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_maximized(ptr: usize,maximized: bool) {
  (*cast(ptr)).set_maximized(maximized)
}

#[no_mangle]
pub unsafe extern "C" fn set_min_inner_size(ptr: usize,height: u32,width: u32) {
  (*cast(ptr)).set_min_inner_size(Some(PhysicalSize::new(width,height)))
}

#[no_mangle]
pub unsafe extern "C" fn set_minimizable(ptr: usize,minimizable: bool) {
  (*cast(ptr)).set_minimizable(minimizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_minimized(ptr: usize,minimized: bool) {
  (*cast(ptr)).set_minimized(minimized)
}

#[no_mangle]
pub unsafe extern "C" fn set_outer_position(ptr: usize,x: i32,y: i32) {
  (*cast(ptr)).set_outer_position(PhysicalPosition::new(x,y))
}

#[no_mangle]
pub unsafe extern "C" fn set_progress_bar(_ptr: usize) {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_resizable(ptr: usize,resizable: bool) {
  (*cast(ptr)).set_resizable(resizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_title(ptr: usize,title: *const i8) {
  (*cast(ptr)).set_title(to_str(title))
}

#[no_mangle]
pub unsafe extern "C" fn set_visible(ptr: usize,visible: bool) {
  (*cast(ptr)).set_visible(visible)
}

#[no_mangle]
pub unsafe extern "C" fn set_visible_on_all_workspaces(ptr: usize,visible: bool) {
  (*cast(ptr)).set_visible_on_all_workspaces(visible)
}

#[no_mangle]
pub unsafe extern "C" fn set_window_icon(_ptr: usize) {
  unimplemented!()
}



