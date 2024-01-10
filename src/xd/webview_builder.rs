
use deno_bindgen::deno_bindgen;

use crate::{
  exception::Exception,
  header_map
};

use wry::{
  WebView,
  WebViewBuilder,
  WebViewAttributes,
};
use tao::window::Window;




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

pub type Headers=std::collections::HashMap<Box<str>,Box<str>>;

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
  pub fn build(self,window: &Window)-> wry::Result<WebView> {
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
      background_color: background_color.map(|Rgba { r,g,b,a }| (r,g,b,a)),
      accept_first_mouse,
      zoom_hotkeys_enabled,
      initialization_scripts,
      clipboard,
      devtools,
      back_forward_navigation_gestures,
      incognito,
      autoplay,
      html,
      url: url.and_then(|url| std::str::FromStr::from_str(&url).ok()),
      headers: headers.map(|h| header_map!(h)),
      ..Default::default()
    };
    let mut builder=WebViewBuilder::new(window);
    builder.attrs=_webview;

    builder.build()
  }

}
