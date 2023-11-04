use std::fmt::Display;


#[allow(type_alias_bounds)]
pub(crate) type Res<T: Default,E: Display=String>=Result<T,E>;

trait Exception<T: Default,E: Display> {
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


pub(crate) trait ToRgba {
  fn to_rgba8(&mut self);
}

impl ToRgba for Vec<u8> {
  fn to_rgba8(&mut self) {
    let mut i=0;
    let mut j: usize;

    while i<self.len() {
      j=i+2;
      self[i]=self[i]^self[j];
      self[j]=self[i]^self[j];
      self[i]=self[i]^self[j];
      self[i+3]=255;
      i+=4;
    }
  }
}
