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
  write_to_clipboard: {
    parameters: ["buffer"],
    result: "void"
  },
  read_clipboard: {
    parameters: [],
    result: "buffer"
  },
  calender: {
    parameters: ["buffer"],
    result: "buffer"
  },
  error: {
    parameters: ["buffer"],
    result: "buffer"
  },
  information: {
    parameters: ["buffer"],
    result: "buffer"
  },
  progress: {
    parameters: [],
    result: "buffer"
  },
  question: {
    parameters: ["buffer"],
    result: "buffer"
  },
  warning: {
    parameters: ["buffer"],
    result: "buffer"
  }
});


const encoder=new TextEncoder;
const toBuffer=(str: string)=> encoder.encode(str+"\0");

export default rust;
export {
  toBuffer,
  encoder
};