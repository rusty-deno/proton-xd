import { None,Some } from "../rust/option.ts";
import { spawn } from "../../bindings/bindings.ts";


export default class Thread<T> {
  private callback: ()=> void;
  private xd=None<T>(null);

  public readonly name?: string;

  constructor(callback: ()=> T,name?: string) {
    this.callback=()=> {
      this.xd=Some(callback());
    };
    
    this.name=name;
  }


  public spawn() {
    const fn=new Deno.UnsafeCallback({
      parameters: [],
      result: "void"
    },this.callback);
    
    
  }
}

