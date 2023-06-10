mod webview;


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
        window::{
            WindowBuilder,
            Theme
        },
        dpi::PhysicalSize,
    },
    webview::WebViewBuilder
};

use once_cell::sync::Lazy;
use deno_bindgen::deno_bindgen;

#[deno_bindgen]
pub fn init(title: &str,url: &str,width: u16,height: u16,_icon: &str,theme: Theme) {
  let event_loop=EventLoop::new();
  let window=WindowBuilder::new()
  .with_title(title)
  .with_inner_size(PhysicalSize::new(width,height))
  .with_theme(Some(theme))
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

  


static mut CLIPBOARD: Lazy<Clipboard>=Lazy::new(||{
    Clipboard::new()
});

#[no_mangle]
pub extern "C" fn write_to_clipboard(str: &str) {
    unsafe {
        CLIPBOARD.write_text(str)
    }
}

#[no_mangle]
pub extern "C" fn read_clipboard()-> String {
    unsafe {
        CLIPBOARD.read_text().unwrap_or_default().as_ptr()
    }
}

#[no_mangle]
pub extern "C" fn screenshot() {
    todo!()
}


#[no_mangle]
pub extern "C" fn screenshot_of_area() {
    todo!()
}


#[no_mangle]
pub extern "C" fn calender(title: &str)-> String {
    dialog_box::calender(title).as_ptr()
}

#[no_mangle]
pub extern "C" fn error(error_message: &str)-> String {
    dialog_box::error(error_message).as_ptr()
}

#[no_mangle]
pub extern "C" fn information(info: &str)-> String {
    dialog_box::information(info).as_ptr()
}

#[no_mangle]
pub extern "C" fn progress()-> String {
    dialog_box::progress().as_ptr()
}

#[no_mangle]
pub extern "C" fn question(question: &str)-> String {
    dialog_box::question(question).as_ptr()
}

#[no_mangle]
pub extern "C" fn warning(message: &str)-> String {
    dialog_box::warning(message).as_ptr()
}

