
use wry::{
  application::{
    event::{
      Event,
      StartCause,
      WindowEvent
    },
    event_loop::{
      ControlFlow,
      EventLoop
    },
    window::{
      WindowBuilder,
      self,
      Icon
    },
    clipboard::Clipboard,
    dpi::{
      PhysicalSize,
      self
    },
  },
  webview::{
    WebViewBuilder,
    RGBA
  },
  http::{
    HeaderMap,
    HeaderValue,
    HeaderName
  }
};



use deno_bindgen::deno_bindgen;
use std::str::FromStr;
use serde_json::from_str;


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
  window_icon: String,
  #[serde(rename="preferredTheme")]
  preferred_theme: Theme,
  focused: bool,
  #[serde(rename="contentProtection")]
  content_protection: bool,
  #[serde(rename="visibleOnAllWorkspaces")]
  visible_on_all_workspaces: bool,
}

#[deno_bindgen]
pub enum Theme {
  Light,
  Dark,
}

impl Theme {
  pub fn theme(&self)-> Option<window::Theme> {
    Some(match self {
      Theme::Light=> window::Theme::Light,
      Theme::Dark=> window::Theme::Dark,
    })
  }
}

#[deno_bindgen]
pub struct Rgba {
  r: u8,
  g: u8,
  b: u8,
  a: u8
}

impl Rgba {
  pub fn to_touple(&self)-> RGBA {
    (self.r,self.g,self.b,self.a)
  }
}

pub fn to_icon(path: String)-> Option<Icon> {
  let img=image::open(path).unwrap_or_default().to_rgb8();
  Icon::from_rgba(img.to_vec(),img.width(),img.height()).ok()
}


#[deno_bindgen]
pub struct WebViewAttrs {
  #[serde(rename="userAgent")]
  pub user_agent: String,
  pub visible: bool,
  pub transparent: bool,
  #[serde(rename="backgroundColor")]
  pub background_color: Rgba,
  #[serde(rename="zoomHotkeysEnabled")]
  pub zoom_hotkeys_enabled: bool,
  #[serde(rename="initializationScripts")]
  pub initialization_scripts: Vec<String>,
  pub clipboard: bool,
  pub devtools: bool,
  #[serde(rename="acceptFirstMouse")]
  pub accept_first_mouse: bool,
  #[serde(rename="backForwardNavigationGestures")]
  pub back_forward_navigation_gestures: bool,
  pub incognito: bool,
  pub autoplay: bool,
}



#[deno_bindgen]
pub enum Content {
  Html {
    html: String
  },
  Url {
    url: String
  },
  UrlAndHeaders {
    url: String,
    headers: Vec<Header>
  }
}

#[deno_bindgen]
pub struct Header {
  name: String,
  value: String
}

impl Header {
  pub fn name(&self)-> HeaderName {
    HeaderName::from_str(&self.name).unwrap()
  }
  pub fn value(&self)-> HeaderValue {
    HeaderValue::from_str(&self.value).unwrap()
  }
}


#[allow(unused_must_use)]
pub fn set_size(window: &mut Option<dpi::Size>,size: Option<Size>) {
  match size {
    Some(s)=> {
      window.insert(s.physical_size());
    },
    None=> (),
  }
}



#[deno_bindgen]
pub fn init(window_atters: &str,webview_atters: &str,content: &str) {
  let window_atters: WindowAttrs=from_str(window_atters).unwrap();
  let webview_atters: WebViewAttrs=from_str(webview_atters).unwrap();
  let content: Content=from_str(content).unwrap();
  
  _init_webview(window_atters,webview_atters,content)
}


fn _init_webview(attrs: WindowAttrs,webview_atters: WebViewAttrs,content: Content) {
  let event_loop=EventLoop::new();
  let mut window_builder=WindowBuilder::new();
  let win=&mut window_builder.window;
  
  set_size(&mut win.inner_size,attrs.inner_size);
  set_size(&mut win.max_inner_size,attrs.max_inner_size);
  set_size(&mut win.min_inner_size,attrs.min_inner_size);




  let window=window_builder
  .with_resizable(attrs.resizable)
  .with_minimizable(attrs.minimizable)
  .with_maximizable(attrs.maximizable)
  .with_closable(attrs.closable)
  .with_title(attrs.title)
  .with_maximized(attrs.maximized)
  .with_visible(attrs.visible)
  .with_transparent(attrs.transparent)
  .with_always_on_top(attrs.always_on_top)
  .with_always_on_bottom(attrs.always_on_bottom)
  .with_theme(attrs.preferred_theme.theme())
  .with_focused(attrs.focused)
  .with_content_protection(attrs.content_protection)
  .with_visible_on_all_workspaces(attrs.visible_on_all_workspaces)
  .build(&event_loop)
  .unwrap();

  


  let mut webview_builder=WebViewBuilder::new(window).unwrap()
  .with_user_agent(&webview_atters.user_agent)
  .with_visible(webview_atters.visible)
  .with_transparent(webview_atters.transparent)
  .with_hotkeys_zoom(webview_atters.zoom_hotkeys_enabled)
  .with_clipboard(webview_atters.clipboard)
  .with_devtools(webview_atters.devtools)
  .with_accept_first_mouse(webview_atters.accept_first_mouse)
  .with_back_forward_navigation_gestures(webview_atters.back_forward_navigation_gestures)
  .with_incognito(webview_atters.incognito)
  .with_autoplay(webview_atters.autoplay)
  .with_background_color(webview_atters.background_color.to_touple());



  for script in &webview_atters.initialization_scripts {
    webview_builder=webview_builder.with_initialization_script(&script);
  }
  
  let to_header_map=|headers: Vec<Header>|-> HeaderMap {
    let mut header_map=HeaderMap::new();
    for header in headers {
      header_map.insert(header.name(),header.value()).unwrap();
    }
    header_map
  };


  let _webview=match content {
    Content::Html { html }=> webview_builder.with_html(html),
    Content::Url { url }=> webview_builder.with_url(&url),
    Content::UrlAndHeaders { url,headers }=> webview_builder.with_url_and_headers(&url,to_header_map(headers))
  }.unwrap().build().unwrap();

  event_loop.run(move |event, _, control_flow| {
    *control_flow=ControlFlow::Wait;
    match event {
      Event::NewEvents(StartCause::Init)=> println!(""),
      Event::WindowEvent {
        event: WindowEvent::CloseRequested,
        ..
      }=> *control_flow=ControlFlow::Exit,
      _=> (),
    }
  });
}


///@param {string} str
#[deno_bindgen]
pub fn write_to_clipboard(str: &str) {
  Clipboard::new().write_text(str)
}

///@returns {string}
#[deno_bindgen]
pub fn read_clipboard()-> String {
  Clipboard::new().read_text().unwrap_or_default()
}