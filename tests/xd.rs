
use wry::{
  WebView,
  WebViewBuilder,
};
use tao::{
  event_loop::{
    EventLoopBuilder,
    ControlFlow
  },
  window::{Window, WindowBuilder},
  event::{
    WindowEvent,
    Event
  },
  platform
};


#[cfg(any(target_os="linux",target_os="macos"))]
use platform::unix::EventLoopBuilderExtUnix;
#[cfg(target_os="windows")]
use platform::windows::EventLoopBuilderExtWindows;



#[allow(unused_macros)]
macro_rules! dbg {
  ($x:expr)=> {
    std::fs::write("tests/dbg.txt",$x).unwrap()
  };
}

macro_rules! run_event_loop {
  ($event_loop:expr)=> {
    $event_loop.run(move |event, _, control_flow| {
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
}

fn new_event_loop()-> tao::event_loop::EventLoop<()> {
  EventLoopBuilder::new().with_any_thread(true).build()
}

#[test]
fn wry_lib() {
  let event_loop=new_event_loop();
  let window=WindowBuilder::new().build(&event_loop).unwrap();
  let _webview=WebViewBuilder::new(&window).attrs;


  run_event_loop! {
    event_loop
  }
}

#[test]
fn child_window() {
  let event_loop=new_event_loop();
  let window=Window::new(&event_loop).unwrap();
  WebViewBuilder::new(&window);

  run_event_loop! {
    event_loop
  }
}






