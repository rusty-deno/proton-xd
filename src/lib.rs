mod xd;
mod screencapture;
mod dialog;
mod thread;
mod ffi;
mod exception;

pub use xd::*;
pub use screencapture::*;
pub use dialog::*;
pub use thread::*;

pub(crate) use exception::*;




#[cfg(test)]
mod tests {
  use wry::{application::{
    event_loop::{
      EventLoopBuilder,
      ControlFlow
    },
    event::{
      WindowEvent,
      Event
    },
    platform::windows::EventLoopBuilderExtWindows,
    window::Window,
  }, webview};

  #[test]
  fn main() {
    std::thread::spawn(xd).join().unwrap();
  }

  fn xd() {
    let event_loop=EventLoopBuilder::new().with_any_thread(true).build();
    let window=Window::new(&event_loop).unwrap();
    let webview=webview::WebView::new(window).unwrap();

    webview.load_url("./index.html");


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
}
