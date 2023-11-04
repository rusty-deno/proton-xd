use std::fmt::Display;
use wasm_bindgen::convert::IntoWasmAbi;

use super::res::Result;


#[allow(type_alias_bounds)]
pub(crate) type Res<T: Default+IntoWasmAbi,E: Display=String>=std::result::Result<T,E>;

pub trait Exception<T: Default+IntoWasmAbi,E: Display> {
  fn to_string(&self)-> String;
  fn to_touple(self)-> (T,String);
}

impl<T: Default+IntoWasmAbi,E: Display> Exception<T,E> for Res<T,E> {
  fn to_string(&self)-> String {
    match self {
      Err(err)=> err.to_string(),
      _=> "".to_owned()
    }
  }

  fn to_touple(self)-> (T,String) {
    match self {
      Ok(mut val)=> (std::mem::take(&mut val),"".to_owned()),
      Err(err)=> (T::default(),err.to_string()),
    }
  }
}

impl<T: Default+IntoWasmAbi,E: Display> Into<Result<T,E>> for Res<T,E> {
  fn into(self)-> Result<T,E> {
    match self {
      Ok(res)=> Result::Ok(res),
      Err(err)=> Result::Err(err)
    }
  }
}
impl<T: Default+IntoWasmAbi,E: Display> From<Result<T,E>> for Res<T,E> {
  fn from(value: Result<T,E>)-> Self {
    match value {
      Result::Ok(res)=> Ok(res),
      Result::Err(err)=> Err(err),
    }
  }
}

