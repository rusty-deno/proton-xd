pub mod ffi;
mod webview;



use ffi::get_str;



#[no_mangle]
extern "C" fn init(title: *const i8,url: *const i8,width: u16,height: u16,_icon: *const i8) {
    webview::init(get_str(title),get_str(url),width,height,get_str(_icon))
}




