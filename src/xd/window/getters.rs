use crate::{
  cast,
  MonitorData,
  AttentionType,
  Position,
  Size,
};
use deno_bindgen::{
  deno_bindgen,
  serde_json::{
    to_string,
    from_str
  }
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


// todo ----------------------------------
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
pub unsafe extern "C" fn drag_window(ptr: usize) {
  (*cast(ptr)).drag_window().unwrap_or(())
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
pub unsafe extern "C" fn is_closable(ptr: usize)-> bool {
  (*cast(ptr)).is_closable()
}

#[no_mangle]
pub unsafe extern "C" fn is_decorated(ptr: usize)-> bool {
  (*cast(ptr)).is_decorated()
}

#[no_mangle]
pub unsafe extern "C" fn is_focused(ptr: usize)-> bool {
  (*cast(ptr)).is_focused()
}

#[no_mangle]
pub unsafe extern "C" fn is_maximizable(ptr: usize)-> bool {
  (*cast(ptr)).is_maximizable()
}

#[no_mangle]
pub unsafe extern "C" fn is_maximized(ptr: usize)-> bool {
  (*cast(ptr)).is_maximized()
}

#[no_mangle]
pub unsafe extern "C" fn is_minimizable(ptr: usize)-> bool {
  (*cast(ptr)).is_minimizable()
}

#[no_mangle]
pub unsafe extern "C" fn is_minimized(ptr: usize)-> bool {
  (*cast(ptr)).is_minimized()
}

#[no_mangle]
pub unsafe extern "C" fn is_resizable(ptr: usize)-> bool {
  (*cast(ptr)).is_resizable()
}

#[no_mangle]
pub unsafe extern "C" fn is_visible(ptr: usize)-> bool {
  (*cast(ptr)).is_visible()
}


//todo-----------------------------------------------------------------------------------------
#[deno_bindgen]
pub fn monitor_from_point(ptr: usize,x: f64,y: f64)-> String {
  unsafe {
    let monitor=(*cast(ptr)).monitor_from_point(x,y).unwrap();
    to_string(&MonitorData::from(monitor)).unwrap_or_default()
  }
}


#[deno_bindgen]
pub fn outer_position(ptr: usize)-> String {
  unsafe {
    let pos: Position=(*cast(ptr)).outer_position().unwrap_or_default().into();
    to_string(&pos).unwrap_or_default()
  }
}

#[deno_bindgen]
pub fn outer_size(ptr: usize)-> String {
  unsafe {
    let size: Size=(*cast(ptr)).outer_size().into();
    to_string(&size).unwrap_or_default()
  }
}

// todo ---------------------------------------------------
#[deno_bindgen]
pub fn primary_monitor(ptr: usize)-> String {
  unsafe {
    let monitor: MonitorData=(*cast(ptr)).primary_monitor().unwrap().into();
    to_string(&monitor).unwrap_or_default()
  }
}

#[deno_bindgen]
pub fn request_redraw(ptr: usize) {
  unsafe {
    (*cast(ptr)).request_redraw();
  }
}

#[deno_bindgen]
pub fn request_user_attention(ptr: usize,request_type: &str) {
  unsafe {
    let request_type: AttentionType=from_str(request_type).unwrap_or(AttentionType::Informational);
    (*cast(ptr)).request_user_attention(Some(request_type.into()));
  }
}

#[deno_bindgen]
pub fn scale_factor(ptr: usize)-> f64 {
  unsafe {
    (*cast(ptr)).scale_factor()
  }
}

#[no_mangle]
pub unsafe extern "C" fn theme(ptr: usize)-> bool {
  match (*cast(ptr)).theme() {
    wry::application::window::Theme::Light=> false,
    _=> true
  }
}

#[deno_bindgen]
pub fn title(ptr: usize)-> String {
  unsafe {
    (*cast(ptr)).title()
  }
}



