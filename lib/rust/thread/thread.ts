import { symbols } from "../../../bindings/bindings.ts";
import { Some,None } from "../mod.ts";

export class Thread<T> {
  private xd=None<T>(null);
  private fn: Deno.UnsafeCallback<{
    parameters: [],
    result: "void"
  }>;

  public readonly name?: string;

  constructor(callback: ()=> T,name?: string) {
    this.fn=new Deno.UnsafeCallback({
      parameters: [],
      result: "void"
    },()=> {
      this.xd=Some(callback());
    });
    this.name=name;
  }


  public async spawn(): Promise<T> {
    await symbols.spawn(this.fn.pointer);
    // deno-lint-ignore no-explicit-any
    return this.xd.value as any;
  }

  public terminate() {
    this.fn.close();
    return this.xd;
  }
  
}

