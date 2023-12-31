
use std::collections::HashMap;

use serde::{
  Serialize,
  Deserialize
};


#[derive(Serialize,Deserialize)]
#[serde(rename_all="lowercase")]
pub(crate) enum NativeType {
  U8,
  U16,
  U32,
  U64,
  Usize,
  I8,
  I16,
  I32,
  I64,
  Isize,
  F32,
  F64,
  Bool,
  Function,
  Pointer,
  Buffer
}

#[derive(Serialize,Deserialize,Default)]
#[serde(rename_all="lowercase")]
pub(crate) enum ReturnType {
  U8,
  U16,
  U32,
  U64,
  Usize,
  I8,
  I16,
  I32,
  I64,
  Isize,
  F32,
  F64,
  Bool,
  Function,
  Pointer,
  Buffer,
  #[default]
  Void
}

#[derive(Serialize,Deserialize)]
pub(crate) struct Bindings(HashMap<Box<str>,FnSig>);


#[derive(Serialize,Deserialize,Default)]
#[serde(rename_all="camelCase")]
pub(crate) struct FnSig {
  parameters: Box<[NativeType]>,
  result: ReturnType,
  non_blocking: Option<bool>
}





