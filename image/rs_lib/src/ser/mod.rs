mod format;
pub(crate) use format::*;



pub fn to_res<T>(err: Result<T,impl std::fmt::Display>)-> String {
  match err {
    Err(err)=> err.to_string(),
    _=> "".to_owned()
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

