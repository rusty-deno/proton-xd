use wry::application::window::Window;

use crate::{
  cast,
  ser::MonitorData, Position
};
use deno_bindgen::{
  deno_bindgen,
  serde_json::to_string
};

#[deno_bindgen]
pub fn available_monitors(ptr: usize)-> String {
  unsafe {
    let iter=(*cast(ptr)).available_monitors();
    let mut monitors: Vec<MonitorData>=vec![];

    for monitor in iter {
      monitors.push(MonitorData::from(monitor))
    }

    to_string(&monitors).unwrap_or_default()
  }
}

#[deno_bindgen]
pub fn current_monitor(ptr: usize)-> String {
  unsafe {
    let monitor: MonitorData=(*cast(ptr)).current_monitor().unwrap().into();
    to_string(&monitor).unwrap_or_default()
  }
}

#[deno_bindgen]
pub fn cursor_position(ptr: usize)-> String {
  unsafe {
    let pos=(*cast(ptr)).cursor_position().unwrap_or_default();
    let pos=Position {
      x: pos.x as i32,
      y: pos.y as i32
    };

    to_string(&pos).unwrap_or_default()
  }
}

#[no_mangle]
pub unsafe extern "C" fn drag_window(ptr: *const Window) {
  (*ptr).drag_window().unwrap_or(())
}

#[deno_bindgen]
pub fn fullscreen(_ptr: usize) {
  unimplemented!()
}

#[deno_bindgen]
pub fn inner_position(ptr: usize)-> String {
  unsafe {
    let xd: Position=(*cast(ptr)).inner_position().unwrap_or_default().into();
    to_string(&xd).unwrap_or_default()
  }
}

#[no_mangle]
pub unsafe extern "C" fn is_closable(ptr: *const Window)-> bool {
  (*ptr).is_closable()
}

#[no_mangle]
pub unsafe extern "C" fn is_decorated(ptr: *const Window)-> bool {
  (*ptr).is_decorated()
}

#[no_mangle]
pub unsafe extern "C" fn is_focused(ptr: *const Window)-> bool {
  (*ptr).is_focused()
}

#[no_mangle]
pub unsafe extern "C" fn is_maximizable(ptr: *const Window)-> bool {
  (*ptr).is_maximizable()
}

#[no_mangle]
pub unsafe extern "C" fn is_maximized(ptr: *const Window)-> bool {
  (*ptr).is_maximized()
}

#[no_mangle]
pub unsafe extern "C" fn is_minimizable(ptr: *const Window)-> bool {
  (*ptr).is_minimizable()
}




#[deno_bindgen]
pub fn monitor_from_point(ptr: usize,x: f64,y: f64)-> String {
  unsafe {
    let monitor=(*cast(ptr)).monitor_from_point(x,y).unwrap();
    to_string(&MonitorData::from(monitor)).unwrap_or_default()
  }
}
