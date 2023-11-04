use std::fmt::Display;
use wasm_bindgen::{
    *,
    convert::IntoWasmAbi
};


pub enum Result<T: Default+IntoWasmAbi,E: Display=String> {
    Ok(T),
    Err(E)
}

impl<T: Default+IntoWasmAbi,E: Display> AsRef<JsValue> for Result<T,E> {
    fn as_ref(&self)-> &JsValue {
        todo!()
    }
}

impl<T: Default+IntoWasmAbi,E: Display> From<JsValue> for Result<T,E> {
    fn from(value: JsValue)-> Self {
                value.into()
    }
}

impl<T: Default+IntoWasmAbi,E: Display> Into<JsValue> for Result<T,E> {
    fn into(self)-> JsValue {
        match self {
            Result::Ok(res)=> JsValue::from(&res as *const T),
            Result::Err(err)=> JsValue::from_str(&err.to_string()),
        }
    }
}


impl<T: Default+IntoWasmAbi,E: Display> JsCast for Result<T,E> {
    fn instanceof(val: &wasm_bindgen::JsValue)-> bool {
        todo!()
}

  fn unchecked_from_js(val: wasm_bindgen::JsValue)-> Self {
    todo!()
}

  fn unchecked_from_js_ref(val: &wasm_bindgen::JsValue)-> &Self {
    todo!()
}

  fn has_type<U>(&self) -> bool
    where
        U: JsCast,
        {
                                    U::is_type_of(self.as_ref())
                            }

            fn dyn_into<U>(self) -> std::result::Result<U, Self>
    where
        U: JsCast,
        {
                                    if self.has_type::<U>() {
                                                                    Ok(self.unchecked_into())
                                        } else {
                                                        Err(self)
                                    }
                }

        fn dyn_ref<U>(&self) -> Option<&U>
    where
        U: JsCast,
        {
                                    if self.has_type::<U>() {
                                                                    Some(self.unchecked_ref())
                                        } else {
                                                        None
            }
        }

        fn unchecked_into<U>(self) -> U
    where
        U: JsCast,
        {
                                    U::unchecked_from_js(self.into())
                            }

            fn unchecked_ref<U>(&self) -> &U
    where
        U: JsCast,
        {
                                    U::unchecked_from_js_ref(self.as_ref())
                            }

            fn is_instance_of<U>(&self) -> bool
    where
        U: JsCast,
        {
                                    U::instanceof(self.as_ref())
                            }

            fn is_type_of(val: &wasm_bindgen::JsValue) -> bool {
                        Self::instanceof(val)
                }
}

