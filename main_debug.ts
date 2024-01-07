// import { XD } from "./mod/mod.ts";


// XD.instantiate("<html><body>hello world!</body></html>",{
//   title: "my-app"
// });

// deno-lint-ignore ban-types
function ref(_self: Object,_name: PropertyKey,descriptor: PropertyDescriptor) {
  const original=descriptor.value!;
  // deno-lint-ignore no-explicit-any
  descriptor.value=function(...args: any[]) {
    console.log("xd");
    
    return original.apply(this,args);
  };

  return descriptor;
}

class XD {
  @ref
  public xd() {

  }
}


new XD().xd();

