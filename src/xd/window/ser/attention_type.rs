use wry::application::window::UserAttentionType;

#[deno_bindgen::deno_bindgen]
pub enum AttentionType {
  Critical,
  Informational,
}



impl Into<UserAttentionType> for AttentionType {
  fn into(self)-> UserAttentionType {
    match self {
      AttentionType::Critical=> UserAttentionType::Critical,
      AttentionType::Informational=> UserAttentionType::Informational,
    }
  }
}

