use deno_bindgen::deno_bindgen;
use std::{
  str::FromStr,
  collections::HashMap
};


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
    HeaderName,
    HeaderValue
  }
};

#[deno_bindgen]
pub struct Rgba {
  pub r: u8,
  pub g: u8,
  pub b: u8,
  pub a: u8
}

impl Default for Rgba {
  fn default()-> Self {
    Rgba { r: 0, g: 0, b: 0, a: 0xff }
  }
}

pub type Headers=HashMap<Box<str>,Box<str>>;

#[deno_bindgen]
#[serde(rename_all = "camelCase")]
pub struct WebViewAttrs {
  pub user_agent: Option<String>,
  pub visible: bool,
  pub transparent: bool,
  pub background_color: Option<Rgba>,
  pub zoom_hotkeys_enabled: bool,
  pub initialization_scripts: Vec<String>,
  pub clipboard: bool,
  pub devtools: bool,
  pub accept_first_mouse: bool,
  pub back_forward_navigation_gestures: bool,
  pub incognito: bool,
  pub autoplay: bool,
  pub html: Option<String>,
  pub url: Option<Box<str>>,
  pub headers: Option<Headers>
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
      headers: to_header_map_opt(headers),
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

fn to_url(url: Option<Box<str>>)-> Option<Url> {
  Url::from_str(&url?).ok()
}

fn to_header_map_opt(headers: Option<Headers>)-> Option<HeaderMap> {
  Some(to_header_map(headers?))
}

pub fn to_header_map(headers: Headers)-> HeaderMap {
  let iter=headers.iter().map(|(name,val)| (HeaderName::from_str(&name).unwrap(),HeaderValue::from_str(&val).unwrap()));
  HeaderMap::from_iter(iter)
}