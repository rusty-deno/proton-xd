use std::{
  thread,
  time::Duration
};
use deno_bindgen::deno_bindgen;


#[deno_bindgen(non_blocking)]
pub fn screenshot(x: i32,y: i32,delay: f32,ptr: usize)-> String {
  ss(x,y,delay,ptr as *mut u32)
}

#[deno_bindgen(non_blocking)]
pub fn screenshot_sync(x: i32,y: i32,delay: f32,ptr: usize)-> String {
  ss(x,y,delay,ptr as *mut u32)
}

pub fn ss(x: i32,y: i32,delay: f32,ptr: *mut u32)-> String {
  thread::sleep(Duration::from_secs_f32(delay));
  let img=screenshoter::ScreenCapturer::from_point(x,y).unwrap().capture().unwrap();
  unsafe {
    (*ptr)=img.height;
    (*ptr.offset(1))=img.width;
    String::from_utf8_unchecked(img.bytes)
  }
}