const ext=(): "dll"|"so"|"dylib"=> {
  switch(Deno.build.os) {
    case "windows":
      return "dll";
    case "darwin":
      return "dylib";
    case "linux":
    default:
      return "so";
  }
}

const rust=Deno.dlopen(new URL(`../target/release/xd.${ext()}`,import.meta.url),{
  init: {
    parameters: ["buffer","buffer","u16","u16","buffer","u8"],
    result: "void"
  },
  write_to_clipboard: {
    parameters: ["buffer"],
    result: "void"
  },
  read_clipboard: {
    parameters: [],
    result: "buffer"
  },
  calender: {
    parameters: ["buffer"],
    result: "buffer"
  },
  error: {
    parameters: ["buffer"],
    result: "buffer"
  },
  information: {
    parameters: ["buffer"],
    result: "buffer"
  },
  progress: {
    parameters: [],
    result: "buffer"
  },
  question: {
    parameters: ["buffer"],
    result: "buffer"
  },
  warning: {
    parameters: ["buffer"],
    result: "buffer"
  }
});
/**
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

#[no_mangle]
pub extern "C" fn screenshot() {
    todo!()
}


#[no_mangle]
pub extern "C" fn screenshot_of_area() {
    todo!()
}


#[no_mangle]
pub extern "C" fn calender(title: *const i8)-> *const u8 {
    dialog_box::calender(get_str(title)).as_ptr()
}

#[no_mangle]
pub extern "C" fn error(error_message: *const i8)-> *const u8 {
    dialog_box::error(get_str(error_message)).as_ptr()
}

#[no_mangle]
pub extern "C" fn information(info: *const i8)-> *const u8 {
    dialog_box::information(get_str(info)).as_ptr()
}

#[no_mangle]
pub extern "C" fn progress()-> *const u8 {
    dialog_box::progress().as_ptr()
}

#[no_mangle]
pub extern "C" fn question(question: *const i8)-> *const u8 {
    dialog_box::question(get_str(question)).as_ptr()
}

#[no_mangle]
pub extern "C" fn warning(message: *const i8)-> *const u8 {
    dialog_box::warning(get_str(message)).as_ptr()
}


 */

const encoder=new TextEncoder;
const toBuffer=(str: string)=> encoder.encode(str+"\0");

export default rust;
export {
  toBuffer,
  encoder
};