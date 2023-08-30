use deno_bindgen::deno_bindgen;
use std::str::FromStr;


use wry::{
  application::window::Window,
  webview::{
    WebView,
    WebViewBuilder,
    RGBA,
    WebViewAttributes,
    Url
  },
  http::{
    HeaderMap,
    HeaderValue,
    HeaderName
  }
};

#[deno_bindgen]
pub struct Rgba {
  r: u8,
  g: u8,
  b: u8,
  a: u8
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

#[deno_bindgen]
pub struct WebViewAttrs {
  #[serde(rename="userAgent")]
  pub user_agent: Option<String>,
  pub visible: bool,
  pub transparent: bool,
  #[serde(rename="backgroundColor")]
  pub background_color: Option<Rgba>,
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
  pub html: Option<String>,
  pub url: Option<String>,
  pub headers: Option<Vec<Header>>
}


impl WebViewAttrs {
  pub fn build(self,window: Window)-> Result<WebView,wry::Error> {
    let WebViewAttrs {
      user_agent,
      visible,
      transparent,
      background_color,
      zoom_hotkeys_enabled,
      initialization_scripts,
      clipboard,
      devtools,
      accept_first_mouse,
      back_forward_navigation_gestures,
      incognito,
      autoplay,
      html,
      url,
      headers
    }=self;

    let _webview=WebViewAttributes {
      user_agent,
      visible,
      transparent,
      background_color: to_rgba(background_color),
      accept_first_mouse,
      zoom_hotkeys_enabled,
      initialization_scripts,
      clipboard,
      devtools,
      back_forward_navigation_gestures,
      incognito,
      autoplay,
      html,
      url: to_url(url),
      headers: to_header_map(headers),
      ..Default::default()
    };
    
    let mut webview=WebViewBuilder::new(window)?;
    webview.webview=_webview;

    webview.build()
  }

}

fn to_rgba(color: Option<Rgba>)-> Option<RGBA> {
  let rbga=color?;
  Some((rbga.r,rbga.g,rbga.b,rbga.a))
}

fn to_url(url: Option<String>)-> Option<Url> {
  Url::from_str(&url?).ok()
}

fn to_header_map(headers: Option<Vec<Header>>)-> Option<HeaderMap> {
  let headers=headers?;
  let mut map=HeaderMap::new();
  
  for header in headers {
    map.insert(header.name(),header.value());
  }
  Some(map)
}