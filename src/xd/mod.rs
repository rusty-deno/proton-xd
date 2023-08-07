pub mod window_builder;
pub mod webview_builder;
pub use window_builder::*;
pub use webview_builder::*;

use deno_bindgen::deno_bindgen;
use serde_json::from_str;

use wry::application::{
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
};








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
pub fn init(window_atters: &str,webview_atters: &str) {
  let window_atters: WindowAttrs=from_str(window_atters).unwrap();
  let webview_atters: WebViewAttrs=from_str(webview_atters).unwrap();
  
  
  _init_webview(window_atters,webview_atters).unwrap();
}


#[allow(warnings)]
fn _init_webview(attrs: WindowAttrs,webview_atters: WebViewAttrs)-> wry::Result<()> {
  let event_loop=EventLoop::new();
  let window=attrs.build(&event_loop)?;
  let webview=webview_atters.build(window)?;
  
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



