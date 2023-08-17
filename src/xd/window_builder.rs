
use deno_bindgen::deno_bindgen;

use wry::application::{
  event_loop::EventLoop,
  window::{
    Window,
    WindowBuilder,
    Theme as theme,
    Icon,
    WindowAttributes,
    WindowSizeConstraints,
  },
  dpi::{
    PhysicalSize,
    Size as size,
    PixelUnit
  },
  error::OsError,
};





#[deno_bindgen]
pub struct Size {
  height: u32,
  width: u32
}

impl Into<size> for Size {
  fn into(self)-> size {
    size::Physical(PhysicalSize::new(self.width,self.height))
  }
}

#[deno_bindgen]
pub enum Theme {
  Light,
  Dark,
}

impl Theme {
  pub fn theme(&self)-> Option<theme> {
    Some(match self {
      Self::Light=> theme::Light,
      Self::Dark=> theme::Dark,
    })
  }
}


#[deno_bindgen]
pub struct WindowAttrs {
  #[serde(rename="innerSize")]
  inner_size: Option<Size>,
  #[serde(rename="minHeight")]
  min_height: Option<PixelUnit>,
  #[serde(rename="maxHeight")]
  max_height: Option<PixelUnit>,
  #[serde(rename="minWidth")]
  min_width: Option<PixelUnit>,
  #[serde(rename="maxWidth")]
  max_width: Option<PixelUnit>,
  resizable: bool,
  minimizable: bool,
  maximizable: bool,
  closable: bool,
  title: String,
  maximized: bool,
  visible: bool,
  transparent: bool,
  decorations: bool,
  #[serde(rename="alwaysOnTop")]
  always_on_top: bool,
  #[serde(rename="alwaysOnBottom")]
  always_on_bottom: bool,
  #[serde(rename="windowIcon")]
  window_icon: Option<String>,
  #[serde(rename="preferredTheme")]
  preferred_theme: Theme,
  focused: bool,
  #[serde(rename="contentProtection")]
  content_protection: bool,
  #[serde(rename="visibleOnAllWorkspaces")]
  visible_on_all_workspaces: bool
}


impl WindowAttrs {

  pub fn build(self,event_loop: &EventLoop<()>)-> Result<Window,OsError> {
    let WindowAttrs {
      always_on_bottom,
      always_on_top,
      closable,
      content_protection,
      decorations,
      focused,
      inner_size,
      max_height,
      max_width,
      min_height,
      min_width,
      maximizable,
      maximized,
      minimizable,
      preferred_theme,
      resizable,
      title,
      transparent,
      visible,
      visible_on_all_workspaces,
      window_icon,
    }=self;

    let window=WindowAttributes {
      always_on_bottom,
      always_on_top,
      closable,
      content_protection,
      decorations,
      focused,
      maximizable,
      maximized,
      minimizable,
      resizable,
      title,
      transparent,
      visible,
      preferred_theme: preferred_theme.theme(),
      window_icon: to_icon(window_icon),
      visible_on_all_workspaces,
      inner_size: to_size(inner_size),
      inner_size_constraints: to_constraints(min_width,min_height,max_width,max_height),
      ..Default::default()
    };
    

    window_builder(window)
    .build(event_loop)
  }
}



fn window_builder(window: WindowAttributes)-> WindowBuilder {
  let mut window_builder=WindowBuilder::new();
  window_builder.window=window;
  window_builder
}

fn to_size(size: Option<Size>)-> Option<size> {
  Some(size?.into())
}

fn to_icon(path: Option<String>)-> Option<Icon> {
  let img=image::open(path?).unwrap_or_default().to_rgb8();
  Icon::from_rgba(img.to_vec(),img.width(),img.height()).ok()
}

fn to_constraints(min_width: Option<PixelUnit>,min_height: Option<PixelUnit>,max_width: Option<PixelUnit>,max_height: Option<PixelUnit>)-> WindowSizeConstraints {
  WindowSizeConstraints {
    max_height,
    max_width,
    min_height,
    min_width
  }
}

