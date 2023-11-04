use wasm_bindgen::prelude::wasm_bindgen;


#[wasm_bindgen]
pub struct Img {
  pub height: u32,
  pub width: u32,
  pub(crate) rgba: Vec<u8>
}

#[wasm_bindgen]
impl Img {
  #[wasm_bindgen(getter)]
  pub fn rgba(&self)-> Vec<u8> {
    self.rgba.clone()
  }
}