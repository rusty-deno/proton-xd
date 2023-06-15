use wry::{
    application::{
        event::{
            Event,
            StartCause,
            WindowEvent
        },
        event_loop::{
            ControlFlow,
            EventLoop
        },
        window::{WindowBuilder,self},
        clipboard::Clipboard, dpi::PhysicalSize,
    },
    webview::WebViewBuilder
};

use deno_bindgen::deno_bindgen;


use std::{
    time::Duration,
    thread, collections::HashMap
};


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
    }
}




pub fn init(attrs: WindowAttrs,webview_atters: WebViewAttrs,scripts: Vec<String>,content: Content) {
    let event_loop=EventLoop::new();
    let window_builder=WindowBuilder::new();
    
    let window=window_builder
    .with_inner_size(attrs.inner_size.physical_size())
    .with_min_inner_size(attrs.min_inner_size.physical_size())
    .with_resizable(attrs.resizable)
    .with_minimizable(attrs.minimizable)
    .with_maximizable(attrs.maximizable)
    .with_closable(attrs.closable)
    .with_title(attrs.title)
    .with_maximized(attrs.maximized)
    .with_visible(attrs.visible)
    .with_transparent(attrs.transparent)
    .with_always_on_top(attrs.always_on_top)
    .with_always_on_bottom(attrs.always_on_bottom)
    .with_theme(attrs.preferred_theme.theme())
    .with_focused(attrs.focused)
    .with_content_protection(attrs.content_protection)
    .with_visible_on_all_workspaces(attrs.visible_on_all_workspaces)
    .build(&event_loop)
    .unwrap();

    let mut webview_builder=WebViewBuilder::new(window).unwrap()
    .with_user_agent(&webview_atters.user_agent)
    .with_visible(webview_atters.visible)
    .with_transparent(webview_atters.transparent)
    .with_hotkeys_zoom(webview_atters.zoom_hotkeys_enabled)
    .with_clipboard(webview_atters.clipboard)
    .with_devtools(webview_atters.devtools)
    .with_accept_first_mouse(webview_atters.accept_first_mouse)
    .with_back_forward_navigation_gestures(webview_atters.back_forward_navigation_gestures)
    .with_incognito(webview_atters.incognito)
    .with_autoplay(webview_atters.autoplay);

    for script in &scripts {
        webview_builder=webview_builder.with_initialization_script(&script);
    }
    match content {
        Content::Html { html }=> webview_builder.with_html(html),
        Content::Url { url }=> webview_builder.with_url(&url),
    }.unwrap();

    event_loop.run(move |event, _, control_flow| {
        *control_flow=ControlFlow::Wait;
        match event {
            Event::NewEvents(StartCause::Init)=> println!(""),
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                ..
            }=> *control_flow=ControlFlow::Exit,
            _=> (),
        }
    });
}













//clipboard
#[deno_bindgen]
pub fn write_to_clipboard(str: &str) {
    Clipboard::new().write_text(str)
}

#[deno_bindgen]
pub fn read_clipboard()-> String {
    Clipboard::new().read_text().unwrap_or_default()
}

//screenshot
#[deno_bindgen(non_blocking)]
pub fn screenshot(x: i32,y: i32,delay: u32)-> String {
    ss(x,y,delay)
}

#[deno_bindgen]
pub fn screenshot_sync(x: i32,y: i32,delay: u32)-> String {
    ss(x,y,delay)
}

fn ss(x: i32,y: i32,delay: u32)-> String {
    thread::sleep(Duration::from_millis(delay as u64));

    let mut img=screenshoter::ScreenCapturer::from_point(x,y).unwrap().capture().unwrap();

    for i in (0..img.bytes.len()).step_by(4) {
        let b=img.bytes[i];//temp var for swaping
        img.bytes[i]=img.bytes[i+2];
        img.bytes[i+2]=b;
        img.bytes[i+3]=255;
    }
    format!("{{\"height\": {},\"width\": {},\"bytes\": {:?}}}",img.height,img.width,img.bytes)
}

//screenrecorder




//dialogs
fn todo()-> String {
    todo!("i didnt check before using that lib as it was so smoll.. that idiot wrote horrible machine dependant code..")
}

#[deno_bindgen]
pub fn calender(_title: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn error(_error_message: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn information(_info: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn progress()-> String {
    todo()
}

#[deno_bindgen]
pub fn question(_question: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn warning(_message: &str)-> String {
    todo()
}

#[deno_bindgen]
pub fn dialog_box_html(title: &str,html: &str) {
    let event_loop=EventLoop::new();

    let dialog=WindowBuilder::new()
    .with_title(title)
    .build(&event_loop)
    .unwrap();

    let _webview=WebViewBuilder::new(dialog).unwrap()
    .with_html(html)
    .unwrap();

    event_loop.run(move |event, _, control_flow| {
        *control_flow=ControlFlow::Wait;
        match event {
            Event::NewEvents(StartCause::Init)=> println!(""),
            Event::WindowEvent {
                event: WindowEvent::CloseRequested,
                ..
            }=> *control_flow=ControlFlow::Exit,
            _=> (),
        }
    });
}

//open
