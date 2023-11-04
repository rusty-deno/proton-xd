use std::fmt::Display;
use wasm_bindgen::*;


pub enum Res<T: Default,E: Display=String> {
  Ok(T),
  Err(E)
}

impl<R: Default,E: Display> AsRef<JsValue> for Res<R,E> {
  fn as_ref(&self) -> &JsValue {
    todo!()
  }
}

impl<R: Default,E: Display> From<JsValue> for Res<R,E> {
  fn from(value: JsValue)-> Self {
    todo!()
  }
}

impl<R: Default,E: Display> Into<JsValue> for Res<R,E> {
  fn into(self)-> JsValue {
    todo!()
  }
}


impl<R: Default,E: Display> JsCast for Res<R,E> {
  fn instanceof(val: &wasm_bindgen::JsValue)-> bool {
    todo!()
  }

  fn unchecked_from_js(val: wasm_bindgen::JsValue)-> Self {
    todo!()
  }

  fn unchecked_from_js_ref(val: &wasm_bindgen::JsValue)-> &Self {
    todo!()
  }

fn has_type<T>(&self) -> bool
    where
        T: JsCast,
    {
        T::is_type_of(self.as_ref())
    }

fn dyn_into<T>(self) -> Result<T, Self>
    where
        T: JsCast,
    {
        if self.has_type::<T>() {
            Ok(self.unchecked_into())
        } else {
            Err(self)
        }
    }

fn dyn_ref<T>(&self) -> Option<&T>
    where
        T: JsCast,
    {
        if self.has_type::<T>() {
            Some(self.unchecked_ref())
        } else {
            None
        }
    }

fn unchecked_into<T>(self) -> T
    where
        T: JsCast,
    {
        T::unchecked_from_js(self.into())
    }

fn unchecked_ref<T>(&self) -> &T
    where
        T: JsCast,
    {
        T::unchecked_from_js_ref(self.as_ref())
    }

fn is_instance_of<T>(&self) -> bool
    where
        T: JsCast,
    {
        T::instanceof(self.as_ref())
    }

fn is_type_of(val: &wasm_bindgen::JsValue) -> bool {
        Self::instanceof(val)
    }
}

