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
        window::WindowBuilder,
        clipboard::Clipboard,
    },
    webview::WebViewBuilder
};

use once_cell::sync::Lazy;

use deno_bindgen::deno_bindgen;


use std::{
    time::Duration,
    thread
};


static mut _EVENT_LOOP: Lazy<EventLoop<()>>=Lazy::new(||{
    EventLoop::new()
});
static mut _WINDOW: Lazy<WindowBuilder>=Lazy::new(|| {
    WindowBuilder::new()
});


/*/
#[deno_bindgen]
pub fn init() {
    // let _get_theme=move || {
    //     Some(match theme {
    //         0=> Theme::Light,
    //         _=> Theme::Dark
    //     })
    // };




    // let window=WindowBuilder::new()
    // .with_title(title)
    // .with_inner_size(PhysicalSize::new(width,height))
    // .with_theme(get_theme())
    // .build(unsafe {&EVENT_LOOP}).unwrap();
    


    // let _webview=WebViewBuilder::new(window).unwrap()
    // .with_url(url).unwrap()
    // .build().unwrap();

    // EVENT_LOOP.run(move |event, _, control_flow| {
    //     *control_flow=ControlFlow::Wait;
    //     match event {
    //         Event::NewEvents(StartCause::Init)=> println!(""),
    //         Event::WindowEvent {
    //             event: WindowEvent::CloseRequested,
    //             ..
    //         }=> *control_flow=ControlFlow::Exit,
    //         _=> (),
    //     }
    // });
}
*/

#[deno_bindgen]
pub struct Size {
    height: u16,
    width: u16
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
    fullscreen: bool,
    title: String,
    maximized: bool,
    visible: bool,
    transparent: bool,
    decorations: bool,
    always_on_top: bool,
    always_on_bottom: bool,
    window_icon: String,
    // window_menu: platform_impl::Menu,
    preferred_theme: u8,
    focused: bool,
    content_protection: bool,
    visible_on_all_workspaces: bool,
}

#[deno_bindgen]
pub fn init() {
    let _event_loop=EventLoop::new();
    let _window_builder=WindowBuilder::new();
    

    // window_attrs;


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
