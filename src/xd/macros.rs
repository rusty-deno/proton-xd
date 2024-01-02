


#[macro_export]
macro_rules! to_constraints {
  ($($val:expr),*)=> {
    wry::application::window::WindowSizeConstraints::new(
      $(
        $val.map(|w| wry::application::dpi::PixelUnit::Physical(wry::application::dpi::PhysicalPixel::new(w)))
      ),*
    )
  };
}

#[macro_export]
macro_rules! cursor_icon {
  ($cursor_icon:expr)=> {
    match $cursor_icon {
      1=> CursorIcon::Crosshair,
      2=> CursorIcon::Hand,
      3=> CursorIcon::Arrow,
      4=> CursorIcon::Move,
      5=> CursorIcon::Text,
      6=> CursorIcon::Wait,
      7=> CursorIcon::Help,
      8=> CursorIcon::Progress,
      9=> CursorIcon::NotAllowed,
      10=> CursorIcon::Default,
      11=> CursorIcon::Crosshair,
      12=> CursorIcon::Hand,
      13=> CursorIcon::Arrow,
      14=> CursorIcon::Move,
      15=> CursorIcon::Text,
      16=> CursorIcon::Wait,
      17=> CursorIcon::Help,
      18=> CursorIcon::Progress,
      19=> CursorIcon::NotAllowed,
      20=> CursorIcon::ContextMenu,
      21=> CursorIcon::Cell,
      22=> CursorIcon::VerticalText,
      23=> CursorIcon::Alias,
      24=> CursorIcon::Copy,
      25=> CursorIcon::NoDrop,
      26=> CursorIcon::Grab,
      27=> CursorIcon::Grabbing,
      28=> CursorIcon::AllScroll,
      29=> CursorIcon::ZoomIn,
      30=> CursorIcon::ZoomOut,
      31=> CursorIcon::EResize,
      32=> CursorIcon::NResize,
      33=> CursorIcon::NeResize,
      34=> CursorIcon::NwResize,
      35=> CursorIcon::SResize,
      36=> CursorIcon::SeResize,
      37=> CursorIcon::SwResize,
      38=> CursorIcon::WResize,
      39=> CursorIcon::EwResize,
      40=> CursorIcon::NsResize,
      41=> CursorIcon::NeswResize,
      42=> CursorIcon::NwseResize,
      43=> CursorIcon::ColResize,
      44=> CursorIcon::RowResize,
      _=> CursorIcon::Default,
    }
  };
}


#[macro_export]
macro_rules! optional_into {
  ($xd:expr)=> {
    $xd.map(|xd| xd.into())
  };
}

#[macro_export]
macro_rules! stringify {
  ($json:expr)=> {
    deno_bindgen::serde_json::to_string(&$json).unwrap_or_throw()
  }
}

#[macro_export]
macro_rules! parse_json {
  ($str:expr)=> {
    deno_bindgen::serde_json::from_str($str).unwrap_or_throw()
  };
}

#[macro_export]
macro_rules! header_map {
  ($headers:expr)=> {
    wry::http::HeaderMap::from_iter(
      $headers.into_iter()
      .map(|(name,val)|
        (
          std::str::FromStr::from_str(&name).unwrap_or_throw(),
          std::str::FromStr::from_str(&val).unwrap_or_throw()
        )
      )
    )
  };
}
