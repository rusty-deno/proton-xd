mod ser;
mod setters;
mod getters;

pub use ser::*;
pub use setters::*;
pub use getters::*;


use wry::application::window::Window;
pub(crate) fn cast(ptr: usize)-> *const Window {
  ptr as *const Window
}
