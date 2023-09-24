use wry::{
  webview::WebView,
  application::window::Window,
};
use crate::{
  Size,
  to_header_map
};

use deno_bindgen::{
  deno_bindgen,
  serde_json::{
    to_string,
    from_str
  }
};

pub fn to_ptr(ptr: usize)-> *const WebView {
  ptr as *const WebView
}

#[deno_bindgen]
pub fn clear_all_browsing_data(ptr: usize) {
  unsafe {
    (*to_ptr(ptr)).clear_all_browsing_data().unwrap_or(());
  }
}

#[deno_bindgen]
pub fn eval_script(ptr: usize,js: &str) {
  unsafe {
    (*to_ptr(ptr)).evaluate_script(js).unwrap_or(());
  }
}

#[deno_bindgen]
pub fn webview_inner_size(ptr: usize)-> String {
  unsafe {
    let size: Size=(*to_ptr(ptr)).inner_size().into();
    to_string(&size).unwrap_or_default()
  }
}

#[deno_bindgen]
pub fn load_url(ptr: usize,url: &str) {
  unsafe {
    (*to_ptr(ptr)).load_url(url);
  }
}

#[deno_bindgen]
pub fn load_url_with_headers(ptr: usize,url: &str,headers: &str) {
  let headers=from_str(headers).unwrap();
  unsafe {
    (*to_ptr(ptr)).load_url_with_headers(url,to_header_map(headers))
  }
}

#[deno_bindgen]
pub fn webview_print(ptr: usize) {
  unsafe {
    (*to_ptr(ptr)).print().unwrap_or(());
  }
}

#[deno_bindgen]
pub fn set_background_color(ptr: usize,r: u8,g: u8,b: u8,a: u8) {
  unsafe {
    (*to_ptr(ptr)).set_background_color((r,g,b,a)).unwrap_or(());
  }
}

#[deno_bindgen]
pub fn url(ptr: usize)-> String {
  unsafe {
    (*to_ptr(ptr)).url().to_string()
  }
}

#[deno_bindgen]
pub fn window(ptr: usize)-> usize {
  unsafe {
    (*to_ptr(ptr)).window() as *const Window as usize
  }
}

#[deno_bindgen]
pub fn zoom(ptr: usize,zoom: f64) {
  unsafe {
    (*to_ptr(ptr)).zoom(zoom);
  }
}


