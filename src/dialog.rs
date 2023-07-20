use deno_bindgen::deno_bindgen;
use native_dialog::{
  MessageDialog,
  MessageType::{
    Error,
    Info,
    Warning,
    self,
  }
};

#[cfg(test)]
mod tests {
  
  #[test]
  fn xd() {
    
  }

}

fn dialog<'a>(title: &'a str,message: &'a str,typ: u8)-> MessageDialog<'a> {
  MessageDialog::new().set_title(title).set_text(message).set_type(get_typ(typ))
}

fn get_typ(typ: u8)-> MessageType {
  match typ {
    1=> Warning,
    2=> Error,
    _=> Info
  }
}


#[deno_bindgen]
pub fn message(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ);
}


pub fn message_cfm(message: &str,title: &str,typ: u8)-> bool {
  dialog(title,message,typ).show_confirm().unwrap_or(false)
}




#[deno_bindgen]
pub fn error(error_message: &str,title: &str,typ: u8) {
  dialog(title,error_message,typ).show_alert().unwrap_or(());
}


#[deno_bindgen]
pub fn info(info: &str,title: &str,typ: u8) {
  dialog(title,info,typ);
}

#[deno_bindgen]
pub fn warning(message: &str,title: &str,typ: u8) {
  dialog(title,message,typ);
}



///todo
#[deno_bindgen]
pub fn progress()-> String {
  todo!()
}

///todo
#[deno_bindgen]
pub fn prompt(_query: &str)-> String {
  todo!()
}

///todo
#[deno_bindgen]
pub fn calender(_title: &str)-> String {
  todo!()
}
