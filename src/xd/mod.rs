
mod dialog;
mod window;
mod webview;
mod window_builder;
mod webview_builder;

pub use dialog::*;
pub use window::*;
pub use webview::*;
pub use window_builder::*;
pub use webview_builder::*;

mod macros;
use crate::exception::Exception;


use deno_bindgen::{
  deno_bindgen,
  serde_json::from_str
};


use wry::application::{
  event::{
    Event,
    WindowEvent
  },
  event_loop::{
    ControlFlow,
    EventLoopBuilder
  },
  platform
};

#[cfg(any(target_os="linux",target_os="macos"))]
use platform::unix::EventLoopBuilderExtUnix;
#[cfg(target_os="windows")]
use platform::windows::EventLoopBuilderExtWindows;


#[deno_bindgen(non_blocking)]
pub async fn init(window_atters: &str,webview_atters: &str,ptr: usize) {
  let window_atters: WindowAttrs=from_str(window_atters).unwrap_or_throw();
  let webview_atters: WebViewAttrs=from_str(webview_atters).unwrap_or_throw();

  spawn_webview(window_atters,webview_atters,ptr as *mut usize).unwrap_or_throw();
}


fn spawn_webview(window_attrs: WindowAttrs,webview_attrs: WebViewAttrs,ptr: *mut usize)-> wry::Result<()> {
  let event_loop=EventLoopBuilder::new().with_any_thread(true).build();
  let window=window_attrs.build(&event_loop).unwrap_or_throw();
  let webview=webview_attrs.build(window)?;

  unsafe {
    ptr.write(webview.window() as *const _ as _);
    ptr.offset(1).write(&webview as *const _ as _);
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
  })
}





