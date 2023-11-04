use std::fmt::Display;

#[allow(type_alias_bounds)]
pub(crate) type Res<T: Default,E: Display=String>=std::result::Result<T,E>;

pub trait Exception<T: Default,E: Display> {
  fn to_string(&self)-> String;
  fn to_touple(self)-> (T,String);
}

impl<T: Default,E: Display> Exception<T,E> for Res<T,E> {
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