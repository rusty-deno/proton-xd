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
    result: "void",
  },
  message_default: {
    parameters: ["buffer"],
    result: "void"
  },
  message_hotspot: {
    parameters: [],
    result: "bool"
  },
  message_icon_label: {
    parameters: ["buffer"],
    result: "void"
  },
  message_set_font: {
    parameters: ["usize","i32"],
    result: "void"
  },
  message_set_hotspot: {
    parameters: ["bool"],
    result: "void"
  },
  message_title: {
    parameters: ["buffer"],
    result: "void"
  },
  message_title_default: {
    parameters: ["buffer"],
    result: "void"
  },
  alert: {
    parameters: ["i32","i32","buffer"],
    result: "void"
  },
  alert_default: {
    parameters: ["buffer"],
    result: "void"
  },
  beep: {
    parameters: ["u8"],
    result: "void"
  },
  color_chooser: {
    parameters: ["buffer","u8"],
    result: "void"
  }
});



const encoder=new TextEncoder;
const toBuffer=(str: string)=> encoder.encode(str+"\0");

export default rust;
export {
  toBuffer,
  encoder
};