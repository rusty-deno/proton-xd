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
    symbols.spawn(this.fn.pointer);
    this.fn.close();
    // deno-lint-ignore no-explicit-any
    return await this.xd.value as any;
  }

  public terminate() {
    this.fn.close();
    return this.xd;
  }
  
  public static async spawn<T>(callback: ()=> T,name?: string) {
    return await new Thread(callback,name).spawn();
  }
}

