use deno_bindgen::deno_bindgen;

use wry::application::{
  event_loop::EventLoop,
  window::{
    Window,
    WindowBuilder,
    Theme as theme,
    Icon,
    WindowAttributes
  },
  dpi::{
    PhysicalSize,
    self
  },
  error::OsError,
};

#[deno_bindgen]
pub struct Size {
  height: u32,
  width: u32
}
impl Size {
  pub fn physical_size(&self)-> dpi::Size {
    dpi::Size::Physical(PhysicalSize::new(self.width,self.height))
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
      Theme::Light=> theme::Light,
      Theme::Dark=> theme::Dark,
    })
  }
}

#[deno_bindgen]
pub struct WindowAttrs {
  #[serde(rename="innerSize")]
  inner_size: Option<Size>,
  #[serde(rename="minInnerSize")]
  min_inner_size: Option<Size>,
  #[serde(rename="maxInnerSize")]
  max_inner_size: Option<Size>,
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
  visible_on_all_workspaces: bool,
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
      max_inner_size,
      maximizable,
      maximized,
      min_inner_size,
      minimizable,
      preferred_theme,
      resizable,
      title,
      transparent,
      visible,
      visible_on_all_workspaces,
      window_icon
    }=self;

    let mut win=WindowAttributes {
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
      ..Default::default()
    };
    set_size(&mut win.inner_size,inner_size);
    set_size(&mut win.max_inner_size,max_inner_size);
    set_size(&mut win.min_inner_size,min_inner_size);

    window_builder(win).build(event_loop)
  }




}

fn window_builder(window: WindowAttributes)-> WindowBuilder {
  let mut window_builder=WindowBuilder::new();
  window_builder.window=window;
  window_builder
}

#[allow(unused_must_use)]
fn set_size(window: &mut Option<dpi::Size>,size: Option<Size>) {
  match size {
    Some(s)=> {
      window.insert(s.physical_size());
    },
    None=> (),
  }
}

fn to_icon(path: Option<String>)-> Option<Icon> {
  match path {
    Some(path)=> {
      let img=image::open(path).unwrap_or_default().to_rgb8();
      Icon::from_rgba(img.to_vec(),img.width(),img.height()).ok()
    },
    None=> None
  }
}

