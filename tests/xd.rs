

use wry::{
  application::{
    event_loop::{
      EventLoopBuilder,
      ControlFlow, EventLoop
    },
    window::{
      Window,
      WindowBuilder
    },
    event::{
      WindowEvent,
      Event
    },
    platform
  },
  webview::WebViewBuilder
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

fn new_event_loop()-> EventLoop<()> {
  EventLoopBuilder::new().with_any_thread(true).build()
}

#[test]
fn wry_lib() {
  let event_loop=new_event_loop();
  let window=WindowBuilder::new().build(&event_loop).unwrap();
  let _webview=WebViewBuilder::new(window).unwrap().build().unwrap();


  run_event_loop! {
    event_loop
  }
}

#[test]
fn child_window() {
  let event_loop=new_event_loop();
  let window=window(&event_loop);
  let _xd=WebViewBuilder::new(window).unwrap()
  .with_html("<html><body>hello wrld</body></html>").unwrap()
  // .with_background_color((255,0,255,255))
  .with_devtools(true)
  .build().unwrap();


  run_event_loop! {
    event_loop
  }
}

fn window(event_loop: &EventLoop<()>)-> Window {
  let mut builder=WindowBuilder::new();
  builder.window.visible_on_all_workspaces=true;

  builder.build(&event_loop).unwrap()
}


#[test]
fn init_test() {
  // let window_attrs=r#"{"resizable":true,"minimizable":true,"maximizable":true,"closable":true,"title":"untitled","maximized":false,"visible":true,"transparent":false,"decorations":true,"alwaysOnTop":false,"alwaysOnBottom":false,"theme":"Dark","focused":true,"contentProtection":false,"visibleOnAllWorkspaces":false}"#;
  // let webview_attrs=r#"{"visible":true,"transparent":false,"zoomHotkeysEnabled":false,"initializationScripts":[],"clipboard":false,"devtools":false,"acceptFirstMouse":false,"backForwardNavigationGestures":false,"incognito":false,"autoplay":true}"#;
  println!("xd");
  

  // xd::init(window_attrs.as_ptr(),window_attrs.len(),webview_attrs.as_ptr(),webview_attrs.len(),0);
}



