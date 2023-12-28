
#[allow(unused_macros)]
macro_rules! dbg {
  ($x:expr)=> {
    std::fs::write("tests/dbg.txt",$x).unwrap()
  };
}



#[test]
fn main() {
  
}

