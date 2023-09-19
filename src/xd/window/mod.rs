mod setters;
mod getters;
pub use setters::*;
pub use getters::*;


use wry::application::window::Window;
pub fn cast(ptr: usize)-> *const Window {
  ptr as *const Window
}
