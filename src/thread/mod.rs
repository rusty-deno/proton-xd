use std::{
  thread::{
    self,
    JoinHandle
  },
  sync::Arc,
  time::Duration,
  mem
};
use deno_bindgen::deno_bindgen;

type FnPtr=extern "C" fn()-> ();
type Void=*const ();
type Handler=*const JoinHandle<()>;


#[deno_bindgen]
pub fn spawn(ptr: usize)-> usize {
  unsafe {
    let ptr=Arc::as_ptr(
      &thread::spawn(move || mem::transmute::<Void,FnPtr>(ptr as Void)())
      .into()
    );

    Arc::increment_strong_count(ptr);
    ptr as usize
  }
}

unsafe fn _join(ptr: Handler) {
  let handler=Arc::from_raw(ptr);

  Arc::decrement_strong_count(ptr);
  Arc::into_inner(handler).unwrap().join().unwrap()//todo: throw exceptions instead
}


#[deno_bindgen]
pub fn join(ptr: usize) {
  unsafe { _join(ptr as Handler) }
}

#[deno_bindgen(non_blocking)]
pub async fn join_async(ptr: usize) {
  unsafe { _join(ptr as Handler) }
}


#[deno_bindgen]
pub fn current() {
  unimplemented!("impl as class")
}

#[no_mangle]
pub extern "C" fn is_panicking()-> bool {
  thread::panicking()
}


#[deno_bindgen]
pub fn sleep(secs: f32) {
  thread::sleep(Duration::from_secs_f32(secs));
}

#[deno_bindgen]
pub fn park() {
  thread::park();
}

#[deno_bindgen]
pub fn park_timeout(dur: f64) {
  thread::park_timeout(Duration::from_secs_f64(dur));
}
