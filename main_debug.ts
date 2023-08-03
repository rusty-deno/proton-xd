// deno-lint-ignore-file
// import ProtonXD from "./mod.ts";


// ProtonXD.XD.instantiate(`<html><body style="color: #ff00ff;">hello wrld</body></html>`,{
//   title: "my-app"
// });

type IterObj={
  [key: string]: unknown;
};
export function confirmDefaultVal(main: IterObj,def: IterObj): any {
  for(const key in def) main[key]??=def[key];
  return main;
}

console.log(confirmDefaultVal({},{"xd": 69}));

