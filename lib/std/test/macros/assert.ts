import { $panic } from "../../macros.ts";


export function $assert(condition: boolean,msg="assertion failed!") {
  if(!condition) $panic(msg);
}

export function $assertEq<T>(arg0: T,arg1: T,msg=`assertion failed!: \`arg0 == arg1\`\narg0: ${arg0}\narg1: ${arg1}`) {
  if(!Object.is(arg0,arg1)) $panic(msg);
}
