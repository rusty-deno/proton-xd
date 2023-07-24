import { open } from "./bindings/bindings.ts";
import { Vec } from "./mod.ts";

const path=new URL("./",import.meta.url);

const xd=path.toString().replaceAll("/","\\")+"xd.png";
const dir=path.pathname.replace("/","");

const paths: Vec<string>=JSON.parse(open(JSON.stringify({
  location: dir,
  filename: xd,
  typ: "MultipleFile"
})));


console.log(paths);
