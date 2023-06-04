use wry::{
  application::{
  event::{
      Event,
      StartCause,
      WindowEvent
    },
    event_loop::{
      ControlFlow,
      EventLoop
    },
    window::WindowBuilder,
    dpi::PhysicalSize,
  },
  webview::WebViewBuilder
};


pub fn init(title: &str,url: &str,width: u16,height: u16,_icon: &str) {
  let event_loop=EventLoop::new();
  let window=WindowBuilder::new()
  .with_title(title)
  .with_inner_size(PhysicalSize::new(width,height))
  .build(&event_loop).unwrap();

  let _webview=WebViewBuilder::new(window).unwrap()
  .with_url(url).unwrap()
  .build().unwrap();

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

