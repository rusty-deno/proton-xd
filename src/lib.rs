pub mod ffi;
mod webview;

use ffi::get_str;
use wry::application::window::Theme;
use fltk::{dialog::{self, BeepType}, enums::Font};


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


///message
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
pub extern "C" fn message_icon_label(label: *const i8) {
    dialog::message_icon_label(get_str(label));
}

#[no_mangle]
pub extern "C" fn message_set_font(idx: usize,sz: i32) {
    dialog::message_set_font(Font::by_index(idx),sz)
}

#[no_mangle]
pub extern "C" fn message_set_hotspot(enabled: bool) {
    dialog::message_set_hotspot(enabled)
}

#[no_mangle]
pub extern "C" fn message_title(title: *const i8) {
    dialog::message_title(get_str(title))
}

#[no_mangle]
pub extern "C" fn message_title_default(title: *const i8) {
    dialog::message_title_default(get_str(title))
}

///alert
#[no_mangle]
pub extern "C" fn alert(x: i32,y: i32,txt: *const i8) {
    dialog::alert(x,y,get_str(txt))
}

#[no_mangle]
pub extern "C" fn alert_default(txt: *const i8) {
    dialog::alert_default(get_str(txt))
}

///beep
#[no_mangle]
pub extern "C" fn beep(tp: u8) {
    let beep_type_from_u8=|| {
        match tp {
            1=> BeepType::Message,
            2=> BeepType::Error,
            3=> BeepType::Question,
            4=> BeepType::Password,
            5=> BeepType::Notification,
            _=> BeepType::Default
        }
    };
    dialog::beep(beep_type_from_u8())
}

#[no_mangle]
pub extern "C" fn error() {
    
}