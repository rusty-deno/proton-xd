pub mod webview;
pub use webview::*;

use std::{
    time::Duration,
    thread,
};
pub use deno_bindgen::deno_bindgen;


//screenshot
#[deno_bindgen(non_blocking)]
pub fn screenshot(x: i32,y: i32,delay: u32)-> String {
    ss(x,y,delay)
}

#[deno_bindgen]
pub fn screenshot_sync(x: i32,y: i32,delay: u32)-> String {
    ss(x,y,delay)
}

fn ss(x: i32,y: i32,delay: u32)-> String {
    thread::sleep(Duration::from_millis(delay as u64));

    let mut img=screenshoter::ScreenCapturer::from_point(x,y).unwrap().capture().unwrap();

    for i in (0..img.bytes.len()).step_by(4) {
        let b=img.bytes[i];//temp var for swaping
        img.bytes[i]=img.bytes[i+2];
        img.bytes[i+2]=b;
        img.bytes[i+3]=255;
    }
    format!("{{\"height\": {},\"width\": {},\"bytes\": {:?}}}",img.height,img.width,img.bytes)
}

//screenrecorder




//dialogs
fn todo()-> String {
    todo!("i didnt check before using that lib as it was so smoll.. that idiot wrote horrible machine dependant code..")
}

#[deno_bindgen]
pub fn calender(_title: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn error(_error_message: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn information(_info: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn progress()-> String {
    todo()
}

#[deno_bindgen]
pub fn question(_question: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn warning(_message: &str)-> String {
    todo()
}


//open
