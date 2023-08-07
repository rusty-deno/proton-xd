#[allow(unused_imports)]
use wry::{
  webview::{
    WebViewBuilder,
    RGBA
  },
  http::{
    HeaderMap,
    HeaderValue,
    HeaderName
  },
  application::{
    clipboard::Clipboard,
    event::{
      Event,
      StartCause,
      WindowEvent
    },
    event_loop::{
      ControlFlow,
      EventLoop
    },
  }
};

pub mod win;
pub use win::*;

use deno_bindgen::deno_bindgen;
use std::str::FromStr;
use serde_json::from_str;


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

#[deno_bindgen]
pub fn init(window_atters: &str,webview_atters: &str,content: &str) {
  let window_atters: WindowAttrs=from_str(window_atters).unwrap();
  let webview_atters: WebViewAttrs=from_str(webview_atters).unwrap();
  let content: Content=from_str(content).unwrap();
  
  _init_webview(window_atters,webview_atters,content).unwrap();
}


#[allow(warnings)]
fn _init_webview(attrs: WindowAttrs,webview_atters: WebViewAttrs,content: Content)-> wry::Result<()> {
  let event_loop=EventLoop::new();
  let window=attrs.build(&event_loop)?;

  // let mut webview_builder=WebViewBuilder::new(window)?
  // .with_user_agent(&webview_atters.user_agent)
  // .with_visible(webview_atters.visible)
  // .with_transparent(webview_atters.transparent)
  // .with_hotkeys_zoom(webview_atters.zoom_hotkeys_enabled)
  // .with_clipboard(webview_atters.clipboard)
  // .with_devtools(webview_atters.devtools)
  // .with_accept_first_mouse(webview_atters.accept_first_mouse)
  // .with_back_forward_navigation_gestures(webview_atters.back_forward_navigation_gestures)
  // .with_incognito(webview_atters.incognito)
  // .with_autoplay(webview_atters.autoplay)
  // .with_background_color(webview_atters.background_color.to_touple());



  // for script in &webview_atters.initialization_scripts {
  //   webview_builder=webview_builder.with_initialization_script(&script);
  // }
  
  // let to_header_map=|headers: Vec<Header>|-> HeaderMap {
  //   let mut header_map=HeaderMap::new();
  //   for header in headers {
  //     header_map.insert(header.name(),header.value()).unwrap();
  //   }
  //   header_map
  // };


  // let _webview=match content {
  //   Content::Html { html }=> webview_builder.with_html(html),
  //   Content::Url { url }=> webview_builder.with_url(&url),
  //   Content::UrlAndHeaders { url,headers }=> webview_builder.with_url_and_headers(&url,to_header_map(headers))
  // }?.build()?;

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



impl Header {
  pub fn name(&self)-> HeaderName {
    HeaderName::from_str(&self.name).unwrap()
  }
  pub fn value(&self)-> HeaderValue {
    HeaderValue::from_str(&self.value).unwrap()
  }
}
