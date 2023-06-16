pub use deno_bindgen::deno_bindgen;

#[deno_bindgen]
pub struct Size {
  height: u16,
  width: u16
}
impl Size {
  pub fn physical_size(&self)-> PhysicalSize<u16> {
    PhysicalSize::new(self.width,self.height)
  }
}

#[deno_bindgen]
pub struct WindowAttrs {
  inner_size: Size,
  min_inner_size: Size,
  max_inner_size: Size,
  resizable: bool,
  minimizable: bool,
  maximizable: bool,
  closable: bool,
  title: String,
  maximized: bool,
  visible: bool,
  transparent: bool,
  decorations: bool,
  always_on_top: bool,
  always_on_bottom: bool,
  window_icon: String,
  // window_menu: platform_impl::Menu,
  preferred_theme: Theme,
  focused: bool,
  content_protection: bool,
  visible_on_all_workspaces: bool,
}

#[deno_bindgen]
pub enum Theme {
  Light,
  Dark,
}

impl Theme {
  pub fn theme(&self)-> Option<window::Theme> {
    Some(match self {
      Theme::Light=> window::Theme::Light,
      Theme::Dark=> window::Theme::Dark,
    })
  }
}

#[deno_bindgen]
pub struct WebViewAttrs {
  pub user_agent: String,
  pub visible: bool,
  pub transparent: bool,
  // pub background_color: RGBA>,
  // pub headers: http::HeaderMap>,
  pub zoom_hotkeys_enabled: bool,
  pub initialization_script: Vec<String>,
  // pub custom_protocols: Vec<(
  //   String,
  //   Box<dyn Fn(&Request<Vec<u8>>) -> Result<Response<Cow<'static, [u8]>>>>,
  // )>,
  // pub ipc_handler: Box<dyn Fn(&Window, String)>>,
  // file_drop_handler: Box<dyn Fn(&Window, FileDropEvent) -> bool>>,
  // pub navigation_handler: Box<dyn Fn(String)-> bool>,
  // pub download_started_handler: Box<dyn FnMut(String, &mut PathBuf) -> bool>>,
  // pub download_completed_handler: Rc<dyn Fn(String, PathBuf>, bool) + 'static>>,
  // pub new_window_req_handler: Box<dyn Fn(String)-> bool>,
  pub clipboard: bool,
  pub devtools: bool,
  pub accept_first_mouse: bool,
  pub back_forward_navigation_gestures: bool,
  // pub document_title_changed_handler: Box<dyn Fn(&Window, String)>>,
  pub incognito: bool,
  pub autoplay: bool,
}

#[deno_bindgen]
pub enum Content {
  Html {
    html: String
  },
  Url {
    url: String
  },
  UrlAndHeaders {
    url: String,
    headers: Vec<Header>
  }
}

#[deno_bindgen]
pub struct Header {
  name: String,
  value: String
}

impl Header {
  pub fn name(&self)-> HeaderName {
    HeaderName::from_str(&self.name).unwrap()
  }
  pub fn value(&self)-> HeaderValue {
    HeaderValue::from_str(&self.value).unwrap()
  }
}