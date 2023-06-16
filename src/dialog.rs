use deno_bindgen::deno_bindgen;


//dialogs
fn todo()-> String {
  todo!("i didnt check before using that lib as it was so smoll.. that idiot wrote horrible machine dependant code..")
}
///todo
#[deno_bindgen]
pub fn calender(_title: &str)-> String {
  todo()
}

///todo
#[deno_bindgen]
pub fn error(_error_message: &str)-> String {
  todo()
}

///todo
#[deno_bindgen]
pub fn information(_info: &str)-> String {
  todo()
}

///todo
#[deno_bindgen]
pub fn progress()-> String {
  todo()
}

///todo
#[deno_bindgen]
pub fn question(_question: &str)-> String {
  todo()
}

///todo
#[deno_bindgen]
pub fn warning(_message: &str)-> String {
  todo()
}


//open
