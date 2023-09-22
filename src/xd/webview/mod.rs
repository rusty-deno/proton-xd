use wry::{
  webview::WebView,
  application::window::Window, http::HeaderMap
};
use crate::{
  Size,
  Rgba,
  Header
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
pub fn close_devtools(ptr: usize) {
  unsafe {
    (*to_ptr(ptr)).close_devtools();
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

#[no_mangle]
pub unsafe extern "C" fn is_devtools_open(ptr: usize)-> bool {
  (*to_ptr(ptr)).is_devtools_open()
}

#[deno_bindgen]
pub fn load_url(ptr: usize,url: &str) {
  unsafe {
    (*to_ptr(ptr)).load_url(url);
  }
}

#[deno_bindgen]
pub fn load_url_with_headers(ptr: usize,url: &str,headers: &str) {
  let headers: Vec<Header>=from_str(headers).unwrap();
  let mut map=HeaderMap::new();
  for header in headers {
    map.insert(header.name(),header.value());
  }
  unsafe {
    (*to_ptr(ptr)).load_url_with_headers(url,map)
  }
}

#[deno_bindgen]
pub fn open_devtools(ptr: usize) {
  unsafe {
    (*to_ptr(ptr)).open_devtools();
  }
}

#[deno_bindgen]
pub fn webview_print(ptr: usize) {
  unsafe {
    (*to_ptr(ptr)).print().unwrap_or(());
  }
}

#[deno_bindgen]
pub fn set_background_color(ptr: usize,rgba: &str) {
  unsafe {
    let Rgba { r,g,b,a }=from_str(rgba).unwrap_or_default();
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


