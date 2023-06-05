const ext=(): "dll"|"so"|"dylib"=> {
  switch(Deno.build.os) {
    case "windows":
      return "dll";
    case "darwin":
      return "dylib";
    case "linux":
    default:
      return "so";
  }
}

const rust=Deno.dlopen(new URL(`../target/release/xd.${ext()}`,import.meta.url),{
  init: {
    parameters: ["buffer","buffer","u16","u16","buffer"],
    result: "void"
  },
  message: {
    parameters: ["i32","i32","buffer"],
    result: "void"
  },
  message_default: {
    parameters: ["buffer"],
    result: "void"
  },
  hotspot: {
    parameters: [],
    result: "bool"
  }
});
/**
 * message(x: i32,y: i32,txt: *const i8)
 * 
 * message_default(txt: *const i8)
 * 
 * message_hotspot()-> bool
 * 
 * message_icon_label(label: *const i8)
 * 
 * message_set_font(idx: usize,sz: i32)
 * 
 * message_set_hotspot(enabled: bool)
 * 
 * message_title(title: *const i8)
 * 
 * message_title_default(title: *const i8)
 */


const encoder=new TextEncoder;
const toBuffer=(str: string)=> encoder.encode(str+"\0");

export default rust;
export {
  toBuffer,
  encoder
};