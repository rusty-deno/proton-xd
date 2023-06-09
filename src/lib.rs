pub mod ffi;
mod webview;

use ffi::get_str;
use wry::application::{
    window::Theme,
    clipboard::Clipboard
};
use once_cell::sync::Lazy;

#[no_mangle]
pub extern "C" fn init(title: *const i8,url: *const i8,width: u16,height: u16,_icon: *const i8,theme: u8) {
    webview::init(
        get_str(title),
        get_str(url),
        width,
        height,
        get_str(_icon),
        match theme {
            0=> Theme::Light,
            _=> Theme::Dark
        }
    )
}


static mut CLIPBOARD: Lazy<Clipboard>=Lazy::new(||{
    Clipboard::new()
});

#[no_mangle]
pub extern "C" fn write_to_clipboard(str: *const i8) {
    unsafe {
        CLIPBOARD.write_text(get_str(str))
    }
}

#[no_mangle]
pub extern "C" fn read_clipboard()-> *const u8 {
    unsafe {
        CLIPBOARD.read_text().unwrap_or_default().as_ptr()
    }
}