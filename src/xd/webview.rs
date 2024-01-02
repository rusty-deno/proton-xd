
use xd_macro::method;
use wry::webview::WebView;


use crate::{
  Size,
  stringify,
  parse_json,
  header_map,
  exception::Exception
};

use deno_bindgen::deno_bindgen;

#[method]
pub fn clear_all_browsing_data(this: &WebView) {
  this.clear_all_browsing_data().unwrap_or_throw()
}

#[method]
pub fn eval_script(this: &WebView,js: &str) {
  this.evaluate_script(js).unwrap_or_throw()
}

#[method]
pub fn webview_inner_size(this: &WebView)-> String {
  stringify! { Size::from(this.inner_size()) }
}

#[method]
pub fn load_url(this: &WebView,url: &str) {
  this.load_url(url)
}

#[method]
pub fn load_url_with_headers(this: &WebView,url: &str,headers: &str) {
  let herders: std::collections::HashMap<Box<str>,Box<str>>=parse_json! { headers };
  this.load_url_with_headers(url,header_map! { herders })
}

#[method]
pub fn webview_print(this: &WebView) {
  this.print().unwrap_or_throw()
}

#[method]
pub fn set_background_color(this: &WebView,r: u8,g: u8,b: u8,a: u8) {
  this.set_background_color((r,g,b,a)).unwrap_or_throw()
}

#[method]
pub fn url(this: &WebView)-> String {
  this.url().to_string()
}

#[method]
pub fn window(this: &WebView)-> usize {
  this.window() as *const _ as _
}

#[method]
pub fn zoom(this: &WebView,zoom: f64) {
  this.zoom(zoom)
}

