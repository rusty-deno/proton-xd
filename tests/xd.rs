use std::ptr;
use wry::{application::{
  event_loop::{
    EventLoop,
    EventLoopBuilder,
    ControlFlow
  },
  window::Window,
  event::{
    WindowEvent,
    Event
  }
}, webview::WebView};



#[allow(unused_macros)]
macro_rules! dbg {
  ($x:expr)=> {
    std::fs::write("tests/dbg.txt",$x).unwrap()
  };
}


trait ThredSafeEventLoop {
  fn new_thread_safe()-> Self;
}

impl ThredSafeEventLoop for EventLoop<()> {
  fn new_thread_safe()-> Self {
    let mut builder=EventLoopBuilder::new();
    unsafe {
      ptr::write(ptr::addr_of_mut!(builder) as *mut bool,true);
    }
    builder.build()
  }
}


#[test]
fn wry_lib() {
  let event_loop=EventLoop::new_thread_safe();
  let window=Window::new(&event_loop).unwrap();
  let _webview=WebView::new(window).unwrap();



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


#[test]
fn dialog() {
  assert!(native_dialog::MessageDialog::new().set_title("xd").show_confirm().unwrap())
}





