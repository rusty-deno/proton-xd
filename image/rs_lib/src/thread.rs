use crate::*;
use wasm_thread::{
  JoinHandle,
  self as thread
};


#[wasm_bindgen]
#[allow(dead_code)]
pub struct Thread {
  inner: JoinHandle<()>
}

impl From<JoinHandle<()>> for Thread {
  fn from(inner: JoinHandle<()>)-> Self {
    Thread { inner }
  }
}

impl From<*const ()> for Thread {
  fn from(ptr: *const ())-> Self {
    unsafe {
      Self {
        inner: thread::spawn(to_fnptr(ptr))
      }
    }
  }
}

#[wasm_bindgen]
impl Thread {
  #[wasm_bindgen(constructor)]
  pub unsafe fn new(ptr: *const ())-> Self {
    ptr.into()
  }

  #[wasm_bindgen]
  pub fn name(&self)-> String {
    self.inner.thread().name().unwrap_or_default().to_owned()
  }

  #[wasm_bindgen]
  pub fn unpark(&self) {
    self.inner.thread().unpark()
  }
  
  #[wasm_bindgen]
  pub fn join(self) {
    self.inner.join().unwrap_throw()
  }
}

#[async_fn]
pub async fn join_async(this: Thread) {
  this.inner.join_async().await.unwrap_throw()
}




#[wasm_bindgen]
pub fn current()-> Thread {
  todo!()
}

#[wasm_bindgen]
pub unsafe fn spawn(ptr: *const ()) {
  thread::spawn(to_fnptr(ptr));
}

#[wasm_bindgen]
pub fn sleep(duration: f32) {
  thread::sleep(std::time::Duration::from_secs_f32(duration));
}


unsafe fn to_fnptr(ptr: *const ())-> fn()-> () {
  std::mem::transmute(ptr)
}