use deno_bindgen::deno_bindgen;
use wry::application::monitor::{MonitorHandle, VideoMode};

use crate::{
  Position,
  Size
};

#[deno_bindgen]
pub struct MonitorData {
  name: Option<String>,
  position: Position,
  scale_factor: f64,
  size: Size,
  modes: Vec<VidMode>
}

#[deno_bindgen]
pub struct VidMode {
  size: Size,
  bit_depth: u16,
  refresh_rate: u16,
}



impl From<MonitorHandle> for MonitorData {
  fn from(value: MonitorHandle)-> Self {
    let pos=value.position();
    let size=value.size();

    Self {
      name: value.name(),
      position: Position { x: pos.x,y: pos.y },
      scale_factor: value.scale_factor(),
      size: Size { height: size.height,width: size.width },
      modes: VidMode::from_modes(value.video_modes())
    }
  }
}

impl From<VideoMode> for VidMode {
  fn from(value: VideoMode)-> Self {
    Self {
      size: value.size().into(),
      bit_depth: value.bit_depth(),
      refresh_rate: value.refresh_rate(),
    }
  }
}

impl VidMode {
  fn from_modes(iter: impl Iterator<Item=VideoMode>)-> Vec<VidMode> {
    let mut vec=vec![];
    
    for vid_mode in iter {
      vec.push(vid_mode.into())
    }

    vec
  }
}




