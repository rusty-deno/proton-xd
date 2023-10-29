import { $unimplemented } from "../mod.ts";



export class Screenshot {
  constructor(
    public bytes: Uint8Array,
    public height: number,
    public width: number
  ) {}


  // deno-lint-ignore require-await
  public async save(_path: string) {
    $unimplemented();
  }
}



