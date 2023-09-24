mod window_builder;
mod webview_builder;
mod window;
mod webview;

pub use window_builder::*;
pub use webview_builder::*;
pub use window::*;
pub use webview::*;



use deno_bindgen::{
  deno_bindgen,
  serde_json::from_str
};

use wry::{
  application::{
    clipboard::Clipboard,
    event::{
      Event,
      WindowEvent
    },
    event_loop::{
      ControlFlow,
      EventLoop
    },
    window::Window
  },
  webview::WebView
};

use crate::ffi::to_str;








#[deno_bindgen]
pub fn write_to_clipboard(str: &str) {
  Clipboard::new().write_text(str)
}


#[deno_bindgen]
pub fn read_clipboard()-> String {
  Clipboard::new().read_text().unwrap_or_default()
}



#[no_mangle]
pub extern "C" fn init(window_atters: *const i8,webview_atters: *const i8,ptr: *mut usize) {
  let window_atters: WindowAttrs=from_str(to_str(window_atters)).unwrap();
  let webview_atters: WebViewAttrs=from_str(to_str(webview_atters)).unwrap();

  spawn_webview(window_atters,webview_atters,ptr).unwrap();
}


fn spawn_webview(window_attrs: WindowAttrs,webview_attrs: WebViewAttrs,ptr: *mut usize)-> wry::Result<()> {
  let event_loop=EventLoop::new();
  let window=window_attrs.build(&event_loop)?;
  let webview=webview_attrs.build(window)?;

  unsafe {
    (*ptr)=webview.window() as *const Window as usize;
    (*ptr.offset(1))=&webview as *const WebView as usize;
  }
  
  event_loop.run(move |event, _, control_flow| {
    *control_flow=ControlFlow::Wait;
    match event {
      Event::WindowEvent {
        event: WindowEvent::CloseRequested,
        ..
      }=> *control_flow=ControlFlow::Exit,
      _=> (),
    }
  });
}


