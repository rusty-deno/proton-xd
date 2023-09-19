use crate::{
  cast,
  ser::MonitorData
};
use deno_bindgen::{
  deno_bindgen,
  serde_json::to_string
};



#[deno_bindgen]
pub fn monitor_from_point(ptr: usize,x: f64,y: f64)-> String {
  unsafe {
    let monitor=(*cast(ptr)).monitor_from_point(x,y).unwrap();
    to_string(&MonitorData::from(monitor)).unwrap_or_default()
  }
}

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










