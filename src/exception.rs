
type ThrowFn=unsafe extern "C" fn(*const u8,len: usize)-> !;
static mut THROW: ThrowFn=default_throw;

unsafe extern "C" fn default_throw(buff: *const u8,len: usize)-> ! {
  let xd=std::str::from_utf8_unchecked(std::slice::from_raw_parts(buff,len));
  panic!("{xd}")
}

#[no_mangle]
pub unsafe fn set_throw(f: ThrowFn) {
  THROW=f
}

pub(crate) trait Exception<T> {
  fn unwrap_or_throw(&self)-> T;
}

pub(crate) fn throw(msg: &str)-> ! {
  unsafe {
    THROW(msg.as_ptr(),msg.len());
  }
}


