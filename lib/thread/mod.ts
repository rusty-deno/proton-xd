import { None,Some } from "../rust/option.ts";



export function spawn<T>(callback: ()=> T) {
  let xd=None<T>(null);
  const fn=new Deno.UnsafeCallback({
    parameters: [],
    result: "void"
  },()=> {
    xd=Some(callback());
  });

  const code=`new Deno.UnsafeFnPointer(${fn.pointer},${fn.definition}).call();`;
  



  return xd;
}


