pub mod ffi;
mod webview;

use ffi::get_str;
use wry::application::window::Theme;
use fltk::dialog;


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



#[no_mangle]
pub extern "C" fn message(x: i32,y: i32,txt: *const i8) {
    dialog::message(x,y,get_str(txt))
}

#[no_mangle]
pub extern "C" fn message_default(txt: *const i8) {
    dialog::message_default(get_str(txt));
}

#[no_mangle]
pub extern "C" fn message_hotspot()-> bool {
    dialog::message_hotspot()
}

#[no_mangle]
pub extern "C" fn message_set_hotspot(enabled: bool) {
    dialog::message_set_hotspot(enabled)
}