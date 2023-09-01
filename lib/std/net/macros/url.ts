import { PathBuf } from "../../path.ts";


export function $url(uri: PathBuf,base?: PathBuf): URL {
  return new URL(uri,base);
}