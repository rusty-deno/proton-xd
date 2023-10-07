use wasm_bindgen::prelude::wasm_bindgen;


#[wasm_bindgen]
pub fn screenshot(x: i32,y: i32,delay: f32) {
  let ss=screenshoter::ScreenCapturer::new(display_info);



}



