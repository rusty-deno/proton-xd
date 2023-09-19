
use crate::{
  to_constraints,
  ffi::to_str,
};
use wry::application::{
  window::Window,
  dpi::{
    PhysicalPosition,
    PhysicalSize
  },
};




#[no_mangle]
pub unsafe extern "C" fn set_always_on_bottom(ptr: *const Window,always_on_bottom: bool) {
  (*ptr).set_always_on_bottom(always_on_bottom)
}

#[no_mangle]
pub unsafe extern "C" fn set_always_on_top(ptr: *const Window,always_on_top: bool) {
  (*ptr).set_always_on_top(always_on_top)
}


#[no_mangle]
pub unsafe extern "C" fn set_closable(ptr: *const Window,closable: bool) {
  (*ptr).set_closable(closable)
}

#[no_mangle]
pub unsafe extern "C" fn set_content_protection(ptr: *const Window,enabled: bool) {
  (*ptr).set_content_protection(enabled)
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_grab(ptr: *const Window,grab: bool) {
  (*ptr).set_cursor_grab(grab).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_icon(_ptr: *const Window) {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_position(ptr: *const Window,x: i32,y: i32) {
  (*ptr).set_cursor_position(PhysicalPosition::new(x,y)).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_cursor_visible(ptr: *const Window,visible: bool) {
  (*ptr).set_cursor_visible(visible);
}

#[no_mangle]
pub unsafe extern "C" fn set_decorations(ptr: *const Window,decorations: bool) {
  (*ptr).set_decorations(decorations)
}

#[no_mangle]
pub unsafe extern "C" fn set_focus(ptr: *const Window) {
  (*ptr).set_focus()
}

#[no_mangle]
pub unsafe extern "C" fn set_fullscreen(_ptr: *const Window) {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_ignore_cursor_events(ptr: *const Window,ignore: bool) {
  (*ptr).set_ignore_cursor_events(ignore).unwrap_or(())
}

#[no_mangle]
pub unsafe extern "C" fn set_ime_position(ptr: *const Window,x: i32,y: i32) {
  (*ptr).set_ime_position(PhysicalPosition::new(x,y))
}

#[no_mangle]
pub unsafe extern "C" fn set_inner_size(ptr: *const Window,height: u32,width: u32) {
  (*ptr).set_inner_size(PhysicalSize::new(width,height))
}

#[no_mangle]
pub unsafe extern "C" fn set_inner_size_constraints(ptr: *const Window,min_width: i32,min_height: i32,max_width: i32,max_height: i32) {
  (*ptr).set_inner_size_constraints(
    to_constraints(
      min_width.into(),
      min_height.into(),
      max_width.into(),
      max_height.into()
    )
  )
}

#[no_mangle]
pub unsafe extern "C" fn set_max_inner_size(ptr: *const Window,height: u32,width: u32) {
  (*ptr).set_max_inner_size(Some(PhysicalSize::new(width,height)))
}

#[no_mangle]
pub unsafe extern "C" fn set_maximizable(ptr: *const Window,maximizable: bool) {
  (*ptr).set_maximizable(maximizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_maximized(ptr: *const Window,maximized: bool) {
  (*ptr).set_maximized(maximized)
}

#[no_mangle]
pub unsafe extern "C" fn set_min_inner_size(ptr: *const Window,height: u32,width: u32) {
  (*ptr).set_min_inner_size(Some(PhysicalSize::new(width,height)))
}

#[no_mangle]
pub unsafe extern "C" fn set_minimizable(ptr: *const Window,minimizable: bool) {
  (*ptr).set_minimizable(minimizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_minimized(ptr: *const Window,minimized: bool) {
  (*ptr).set_minimized(minimized)
}

#[no_mangle]
pub unsafe extern "C" fn set_outer_position(ptr: *const Window,x: i32,y: i32) {
  (*ptr).set_outer_position(PhysicalPosition::new(x,y))
}

#[no_mangle]
pub unsafe extern "C" fn set_progress_bar(_ptr: *const Window) {
  unimplemented!()
}

#[no_mangle]
pub unsafe extern "C" fn set_resizable(ptr: *const Window,resizable: bool) {
  (*ptr).set_resizable(resizable)
}

#[no_mangle]
pub unsafe extern "C" fn set_title(ptr: *const Window,title: *const i8) {
  (*ptr).set_title(to_str(title))
}

#[no_mangle]
pub unsafe extern "C" fn set_visible(ptr: *const Window,visible: bool) {
  (*ptr).set_visible(visible)
}

#[no_mangle]
pub unsafe extern "C" fn set_visible_on_all_workspaces(ptr: *const Window,visible: bool) {
  (*ptr).set_visible_on_all_workspaces(visible)
}

#[no_mangle]
pub unsafe extern "C" fn set_window_icon(_ptr: *const Window) {
  unimplemented!()
}



