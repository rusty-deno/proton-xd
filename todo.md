# dialog { open,save }//message,error,
# // clipboard
# screen
# desktop capturer


    <!-- min_inner_size: Size, -->
    <!-- max_inner_size: Size, -->
    <!-- resizable: bool, -->
    <!-- minimizable: bool, -->
    <!-- maximizable: bool, -->
    <!-- closable: bool, -->
    <!-- title: String, -->
    <!-- maximized: bool, -->
    <!-- visible: bool, -->
    <!-- transparent: bool, -->
    <!-- decorations: bool, -->
    <!-- always_on_top: bool, -->
    <!-- always_on_bottom: bool, -->
    window_icon: String,
    // window_menu: platform_impl::Menu,
    <!-- preferred_theme: u8, -->
    <!-- focused: bool, -->
    <!-- content_protection: bool, -->
    <!-- visible_on_all_workspaces: bool, -->
    



    pub user_agent: String,
    pub visible: bool,
    pub transparent: bool,
    // pub background_color: RGBA>,
    pub url: String,
    // pub headers: http::HeaderMap>,
    pub zoom_hotkeys_enabled: bool,
    pub html: String,
    pub initialization_scripts: Vec<String>,
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