use wry::application::window::Window;


#[no_mangle]
pub unsafe extern "C" fn set_always_on_bottom(ptr: *const Window,always_on_bottom: bool) {
  (*ptr).set_always_on_bottom(always_on_bottom)
}

#[no_mangle]
pub unsafe extern "C" fn set_always_on_top(ptr: *const Window,always_on_top: bool) {
  (*ptr).set_always_on_top(always_on_top)
}




#[no_mangle]
pub unsafe extern "C" fn set_cursor_visible(ptr: *const Window,visible: bool) {
  (*ptr).set_cursor_visible(visible);
}