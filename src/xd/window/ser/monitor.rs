use deno_bindgen::deno_bindgen;
use wry::application::{
  monitor::{
    MonitorHandle,
    VideoMode
  },
  window::Fullscreen,
};

use crate::{
  Position,
  Size
};

#[deno_bindgen]
#[serde(rename_all = "camelCase")]
pub struct MonitorData {
  name: Option<String>,
  position: Position,
  scale_factor: f64,
  size: Size,
  modes: Vec<VidMode>
}

#[deno_bindgen]
#[serde(rename_all = "camelCase")]
pub struct VidMode {
  size: Size,
  bit_depth: u16,
  refresh_rate: u16,
}


#[deno_bindgen]
#[serde(rename_all = "camelCase")]
pub enum FullScreen {
  Exclusive {
    exclusive: VidMode
  },
  Borderless {
    borderless: Option<MonitorData>
  },
  None
}


impl From<MonitorHandle> for MonitorData {
  fn from(value: MonitorHandle)-> Self {
    Self {
      name: value.name(),
      position: value.position().into(),
      scale_factor: value.scale_factor(),
      size: value.size().into(),
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
    iter.map(|vid_mode| vid_mode.into()).collect()
  }
}


impl From<Fullscreen> for FullScreen {
  fn from(fullscreen: Fullscreen)-> Self {
    match fullscreen {
      Fullscreen::Exclusive(exclusive)=> FullScreen::Exclusive { exclusive: exclusive.into() },
      Fullscreen::Borderless(borderless)=> FullScreen::Borderless {
        borderless: borderless.and_then(|monitor| Some(monitor.into()))
      },
      _=> FullScreen::None,
    }
  }
}

impl From<Option<Fullscreen>> for FullScreen {
  fn from(fullscreen: Option<Fullscreen>)-> Self {
    match fullscreen {
      Some(fullscreen)=> fullscreen.into(),
      None=> FullScreen::None,
    }
  }
}

impl Default for FullScreen {
  fn default()-> Self {
    Self::None
  }
}

