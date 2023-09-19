use deno_bindgen::deno_bindgen;
use wry::application::monitor::MonitorHandle;

use crate::{
  Position,
  Size
};

#[deno_bindgen]
pub struct MonitorData {
  name: Option<String>,
  position: Position,
  scale_factor: f64,
  size: Size
}

impl From<MonitorHandle> for MonitorData {
  fn from(value: MonitorHandle)-> Self {
    let pos=value.position();
    let size=value.size();

    Self {
      name: value.name(),
      position: Position { x: pos.x,y: pos.y },
      scale_factor: value.scale_factor(),
      size: Size { height: size.height,width: size.width }
    }
  }
}


