use std::{
  collections::LinkedList,
  io::{
    Write,
    Result as IoRes
  },
};

#[derive(Default)]
pub(crate) struct Writer {
  stream: LinkedList<u8>
}

impl Write for Writer {
  fn write(&mut self,buf: &[u8])-> IoRes<usize> {
    let len=self.stream.len();

    for byte in buf {
      self.stream.push_back(*byte);
    }

    Ok(self.stream.len()-len)
  }

  fn flush(&mut self)-> IoRes<()> {
    Ok(())
  }
}

impl Writer {
  pub fn new()-> Self {
    Self::default()
  }
}

impl Into<Vec<u8>> for Writer {
  fn into(self)-> Vec<u8> {
    self.stream.into_iter().collect()
  }
}



