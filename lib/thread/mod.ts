import { None,Some } from "../rust/option.ts";
import { spawn } from "../../bindings/bindings.ts";


export default class Thread<T> {
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


  public spawn() {
    spawn(this.fn.pointer);
  }

  public terminate() {
    this.fn.close();
    return this.xd;
  }
  
}

