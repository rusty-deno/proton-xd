pub mod ffi;
mod webview;

use ffi::get_str;
use wry::application::window::Theme;


#[no_mangle]
pub extern "C" fn init(title: *const i8,url: *const i8,width: u16,height: u16,_icon: *const i8,theme: u8) {
    webview::init(
        get_str(title),
        get_str(url),
        width,
        height,
        get_str(_icon),
        match u8 {
            0=> Theme::Light,
            _=> Theme::Dark
        }
    )
}


#[no_mangle]
pub extern "C" fn fltk_init() {
    
}

