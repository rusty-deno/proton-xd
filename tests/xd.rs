
#[allow(unused_macros)]
macro_rules! dbg {
  ($x:expr)=> {
    std::fs::write("tests/dbg.txt",$x).unwrap()
  };
}



#[test]
fn main() {
  let res=nfd::open_dialog(Some(""),Some("xd"),nfd::DialogType::MultipleFiles).unwrap();
  let xd=match res {
    nfd::Response::Cancel=> "".to_owned(),
    nfd::Response::Okay(res)=> res,
    nfd::Response::OkayMultiple(res)=> res.join(",")
  };
  dbg!(xd);
}

