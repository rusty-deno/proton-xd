

pub fn get_str(buffer: *const i8)-> &'static str {
  unsafe {
    std::ffi::CStr::from_ptr(buffer).to_str().unwrap_or_default()
  }
}