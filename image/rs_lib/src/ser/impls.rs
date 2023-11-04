


pub(crate) trait ToRgba {
  fn to_rgba8(&mut self);
  fn to_rgba8_if_needed(&mut self,color_type: u8) {
    if color_type==10 {
      self.to_rgba8();
    }
  }
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

