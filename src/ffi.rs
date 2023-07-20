use std::ffi::CStr;


pub fn to_str<'a>(buff: *const i8)-> &'a str {
  unsafe {
    CStr::from_ptr(buff).to_str().unwrap_or("")
  }
}

