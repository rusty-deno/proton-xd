
mod window;
mod webview;
mod window_builder;
mod webview_builder;

pub use window::*;
pub use webview::*;
pub use window_builder::*;
pub use webview_builder::*;

mod macros;
use std::ptr;
use crate::exception::Exception;


use deno_bindgen::{
  deno_bindgen,
  serde_json::from_str
};

use wry::application::{
  clipboard::Clipboard,
  event::{
    Event,
    WindowEvent
  },
  event_loop::{
    ControlFlow,
    EventLoopBuilder,
    EventLoop
  }
};




#[deno_bindgen]
pub fn write_to_clipboard(str: &str) {
  Clipboard::new().write_text(str)
}


#[deno_bindgen]
pub fn read_clipboard()-> String {
  Clipboard::new().read_text().unwrap_or_throw()
}




#[deno_bindgen(non_blocking)]
pub async fn init(window_atters: &str,webview_atters: &str,ptr: usize) {
  let window_atters: WindowAttrs=from_str(window_atters).unwrap_or_throw();
  let webview_atters: WebViewAttrs=from_str(webview_atters).unwrap_or_throw();

  spawn_webview(window_atters,webview_atters,ptr as *mut usize).unwrap_or_throw();
}


fn spawn_webview(window_attrs: WindowAttrs,webview_attrs: WebViewAttrs,ptr: *mut usize)-> wry::Result<()> {
  let event_loop=EventLoop::new_thread_safe();
  let window=window_attrs.build(&event_loop)?;
  let webview=webview_attrs.build(window)?;

  unsafe {
    (*ptr)=webview.window() as *const _ as _;
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



trait ThreadSafeEventLoop {
  fn new_thread_safe()-> Self;
}

impl ThreadSafeEventLoop for EventLoop<()> {
  fn new_thread_safe()-> Self {
    let mut builder=EventLoopBuilder::new();
    unsafe {
      ptr::write(ptr::addr_of_mut!(builder) as *mut bool,true);
    }
    builder.build()
  }
}

