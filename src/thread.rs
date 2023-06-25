use std::{
  thread::{self, JoinHandle},
  time::Duration
};
use deno_bindgen::deno_bindgen;


#[deno_bindgen]
pub fn sleep(secs: f32) {
  thread::sleep(Duration::from_secs_f32(secs));
}




