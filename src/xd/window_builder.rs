
use deno_bindgen::deno_bindgen;

use wry::application::{
  event_loop::EventLoop,
  window::{
    Window,
    WindowBuilder,
    Theme as theme,
    Icon,
    WindowAttributes,
  },
  dpi::{
    PhysicalSize,
    Size as size
  },
  error::OsError,
  menu::{
    MenuItem as menu_item,
    AboutMetadata as metadata, MenuBar,
  }
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
    use theme::*;
    Some(match self {
      Self::Light=> Light,
      Self::Dark=> Dark,
    })
  }
}

#[deno_bindgen]
#[derive(Clone)]
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
    use menu_item::*;
    match self {
      MenuItem::About {title,metadata}=> About(title,metadata.into()),
      MenuItem::Hide=> Hide,
      MenuItem::Services=> Services,
      MenuItem::HideOthers=> HideOthers,
      MenuItem::ShowAll=> ShowAll,
      MenuItem::CloseWindow=> CloseWindow,
      MenuItem::Quit=> Quit,
      MenuItem::Copy=> Copy,
      MenuItem::Cut=> Cut,
      MenuItem::Undo=> Undo,
      MenuItem::Redo=> Redo,
      MenuItem::SelectAll=> SelectAll,
      MenuItem::Paste=> Paste,
      MenuItem::EnterFullScreen=> EnterFullScreen,
      MenuItem::Minimize=> Minimize,
      MenuItem::Zoom=> Zoom,
      MenuItem::Separator=> Separator,
    }
  }
}



#[deno_bindgen]
pub enum MenuEntity {
  Item {
    item: Attributes
  },
  NativeItem {
    item: MenuItem
  },
  SubMenu {
    title: String,
    menu: Vec<MenuEntity>,
    enabled: bool
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
  visible_on_all_workspaces: bool,
  menu: Vec<MenuEntity>
}


impl WindowAttrs {
  #[allow(warnings)]
  pub fn build(self,event_loop: &EventLoop<()>)-> Result<Window,OsError> {
    use MenuEntity::*;
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
      menu
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
    
    let ser_menu=menu;
    let mut menu=MenuBar::new();
    

    window_builder(win)
    .with_menu(menu)
    .build(event_loop)
  }

}


// match entity {
//   Item { item }=> {
//     parent.borrow_mut().add_item(
//       MenuItemAttributes::new(&item.title)
//       .with_enabled(item.enabled)
//       .with_id(MenuId::new(&item.id))
//       .with_selected(item.selected)
//     );
//   },
//   NativeItem { item }=> {
//     parent.borrow_mut().add_native_item(item.clone().into());
//   },
//   SubMenu { menu, title, enabled }=> {
//     // let mut submenu=MenuBar::new();
//     // parent.borrow_mut().add_submenu(title,*enabled,submenu);

//     // families.borrow_mut().push((RefCell::new(&mut submenu),menu));
//     unimplemented!();
    
//   },
// }


fn window_builder(window: WindowAttributes)-> WindowBuilder {
  let mut window_builder=WindowBuilder::new();
  window_builder.window=window;
  window_builder
}

fn to_size(size: Option<Size>)-> Option<size> {
  Some(size?.into())
}

fn to_icon(path: Option<String>)-> Option<Icon> {
  let img=image::open(path?).unwrap_or_default().to_rgb8();
  Icon::from_rgba(img.to_vec(),img.width(),img.height()).ok()
}



#[cfg(test)]
mod tests {
  use wry::application::{
    menu::{
      MenuBar,
      MenuItemAttributes,
      MenuItem
    },
    event_loop::{
      EventLoop,
      ControlFlow
    },
    event::{
      StartCause,
      Event,
      WindowEvent
    },
    platform::windows::EventLoopExtWindows,
    window::WindowBuilder,
  };

  #[test]
  fn xd() {
    let event_loop: EventLoop<()>=EventLoopExtWindows::new_any_thread();

    let mut menu=MenuBar::new();

    let mut submenu=MenuBar::new();
    submenu.add_item(MenuItemAttributes::new("xd"));
    submenu.add_item(MenuItemAttributes::new("gg"));
    submenu.add_native_item(MenuItem::Quit);
    


    menu.add_submenu("xd",true,submenu);


    let _window=WindowBuilder::new()
    .with_menu(menu)
    .build(&event_loop)
    .unwrap();



    
    event_loop.run(move |event, _, control_flow| {
      *control_flow=ControlFlow::Wait;
      match event {
        Event::NewEvents(StartCause::Init)=> (),
        Event::WindowEvent {
          event: WindowEvent::CloseRequested,
          ..
        }=> *control_flow=ControlFlow::Exit,
        _=> (),
      }
    });
  }
  
}


