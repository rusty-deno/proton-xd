use deno_bindgen::deno_bindgen;

#[allow(unused_imports)]
use wry::application::{
  event_loop::EventLoop,
  window::{
    Window,
    WindowBuilder,
    Theme as theme,
    Icon,
    WindowAttributes
  },
  dpi::{
    PhysicalSize,
    Size as size
  },
  error::OsError,
  menu::MenuItem as menu_item,
};
#[allow(unused_imports)]
use wry::application::{
  menu::{
    MenuBar,
    MenuItemAttributes,
    AboutMetadata as metadata,
    MenuId
  },
  event_loop::ControlFlow,
  event::{
    StartCause,
    Event,
    WindowEvent
  },
  platform::windows::EventLoopExtWindows,
};


#[deno_bindgen]
pub struct Size {
  height: u32,
  width: u32
}

impl Into<size> for Size {
  fn into(self) -> size {
    size::Physical(PhysicalSize::new(self.width,self.height))
  }
}

#[deno_bindgen]
pub enum Theme {
  Light,
  Dark,
}

impl Theme {
  pub fn theme(&self)-> Option<theme> {
    Some(match self {
      Theme::Light=> theme::Light,
      Theme::Dark=> theme::Dark,
    })
  }
}

#[deno_bindgen]
pub struct AboutMetadata {
  pub version: Option<String>,
  pub authors: Option<Vec<String>>,
  pub comments: Option<String>,
  pub copyright: Option<String>,
  pub license: Option<String>,
  pub website: Option<String>,
  pub website_label: Option<String>,
}

impl Into<metadata> for AboutMetadata {
  fn into(self)-> metadata {
    let AboutMetadata {
      version,
      authors,
      comments,
      copyright,
      license,
      website,
      website_label
    }=self;
    metadata {
      version,
      authors,
      comments,
      copyright,
      license,
      website,
      website_label
    }
  }
}

#[deno_bindgen]
pub struct Attributes {
  id: String,
  title: String,
  // #[serde(rename="keyboardAccelerator")] todo
  // keyboard_accelerator: Option<Accelerator>,
  enabled: bool,
  selected: bool,
}

impl<'a> Into<MenuItemAttributes<'a>> for Attributes {
  fn into(self)-> MenuItemAttributes<'a> {
    // MenuItemAttributes::new(self.title)
    // .with_enabled(self.enabled)
    // .with_id(MenuId::new(self.id))
    // .with_selected(self.selected)
    unimplemented!()
  }
}


#[deno_bindgen]
pub enum MenuItem {
  About {
    title: String,
    metadata: AboutMetadata
  },
  Hide,
  Services,
  HideOthers,
  ShowAll,
  CloseWindow,
  Quit,
  Copy,
  Cut,
  Undo,
  Redo,
  SelectAll,
  Paste,
  EnterFullScreen,
  Minimize,
  Zoom,
  Separator,
}

impl Into<menu_item> for MenuItem {
  fn into(self)-> menu_item {
    use MenuItem::*;
    match self {
      About {title,metadata}=> menu_item::About(title,metadata.into()),
      Hide=> menu_item::Hide,
      Services=> menu_item::Services,
      HideOthers=> menu_item::HideOthers,
      ShowAll=> menu_item::ShowAll,
      CloseWindow=> menu_item::CloseWindow,
      Quit=> menu_item::Quit,
      Copy=> menu_item::Copy,
      Cut=> menu_item::Cut,
      Undo=> menu_item::Undo,
      Redo=> menu_item::Redo,
      SelectAll=> menu_item::SelectAll,
      Paste=> menu_item::Paste,
      EnterFullScreen=> menu_item::EnterFullScreen,
      Minimize=> menu_item::Minimize,
      Zoom=> menu_item::Zoom,
      Separator=> menu_item::Separator,
    }
  }
}

#[deno_bindgen]
pub enum Entity {
  Item {
    item: Attributes
  },
  NativeItem {
    item: MenuItem
  },
  SubMenu {
    menu: Box<Entity>
  }
}

impl Entity {
  pub fn for_each() {
    unimplemented!()
  }
}



#[deno_bindgen]
pub struct WindowAttrs {
  #[serde(rename="innerSize")]
  inner_size: Option<Size>,
  #[serde(rename="minInnerSize")]
  min_inner_size: Option<Size>,
  #[serde(rename="maxInnerSize")]
  max_inner_size: Option<Size>,
  resizable: bool,
  minimizable: bool,
  maximizable: bool,
  closable: bool,
  title: String,
  maximized: bool,
  visible: bool,
  transparent: bool,
  decorations: bool,
  #[serde(rename="alwaysOnTop")]
  always_on_top: bool,
  #[serde(rename="alwaysOnBottom")]
  always_on_bottom: bool,
  #[serde(rename="windowIcon")]
  window_icon: Option<String>,
  #[serde(rename="preferredTheme")]
  preferred_theme: Theme,
  focused: bool,
  #[serde(rename="contentProtection")]
  content_protection: bool,
  #[serde(rename="visibleOnAllWorkspaces")]
  visible_on_all_workspaces: bool
}


impl WindowAttrs {
  pub fn build(self,event_loop: &EventLoop<()>)-> Result<Window,OsError> {
    let WindowAttrs {
      always_on_bottom,
      always_on_top,
      closable,
      content_protection,
      decorations,
      focused,
      inner_size,
      max_inner_size,
      maximizable,
      maximized,
      min_inner_size,
      minimizable,
      preferred_theme,
      resizable,
      title,
      transparent,
      visible,
      visible_on_all_workspaces,
      window_icon,
      ..
    }=self;

    let win=WindowAttributes {
      always_on_bottom,
      always_on_top,
      closable,
      content_protection,
      decorations,
      focused,
      maximizable,
      maximized,
      minimizable,
      resizable,
      title,
      transparent,
      visible,
      preferred_theme: preferred_theme.theme(),
      window_icon: to_icon(window_icon),
      visible_on_all_workspaces,
      inner_size: to_size(inner_size),
      max_inner_size: to_size(max_inner_size),
      min_inner_size: to_size(min_inner_size),
      ..Default::default()
    };

    window_builder(win).build(event_loop)
  }

}



fn window_builder(window: WindowAttributes)-> WindowBuilder {
  let mut window_builder=WindowBuilder::new();
  window_builder.window=window;
  window_builder
}

fn to_size(size: Option<Size>)-> Option<size> {
  match size {
    Some(s)=> Some(s.into()),
    None=> None,
  }
}

fn to_icon(path: Option<String>)-> Option<Icon> {
  match path {
    Some(path)=> {
      let img=image::open(path).unwrap_or_default().to_rgb8();
      Icon::from_rgba(img.to_vec(),img.width(),img.height()).ok()
    },
    None=> None
  }
}









#[test]
fn xd() {
  let event_loop: EventLoop<()>=EventLoopExtWindows::new_any_thread();

  let mut menu=MenuBar::new();

  let mut submenu=MenuBar::new();
  submenu.add_item(MenuItemAttributes::new("xd"));
  submenu.add_item(MenuItemAttributes::new("gg"));

  submenu.add_native_item(menu_item::Quit);


  menu.add_submenu("xd",true,submenu);
  


  let _window=WindowBuilder::new()
  .with_menu(menu)
  .build(&event_loop)
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