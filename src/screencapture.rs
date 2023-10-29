use std::{
  thread,
  time::Duration
};
use deno_bindgen::deno_bindgen;


#[deno_bindgen(non_blocking)]
pub fn screenshot(x: i32,y: i32,delay: f32,ptr: usize)-> Vec<u8> {
  ss(x,y,delay,ptr as *mut u32)
}

#[deno_bindgen]
pub fn screenshot_sync(x: i32,y: i32,delay: f32,ptr: usize)-> Vec<u8> {
  ss(x,y,delay,ptr as *mut u32);
  vec![]
}

pub fn ss(x: i32,y: i32,delay: f32,ptr: *mut u32)-> Vec<u8> {
  thread::sleep(Duration::from_secs_f32(delay));
  let img=screenshoter::ScreenCapturer::from_point(x,y).unwrap().capture().unwrap();
  unsafe {
    (*ptr)=img.height;
    (*ptr.offset(1))=img.width;
    img.bytes
  }
}