import Option from "../io/option.ts";
import { map } from "../collections/mod.ts";


export default class Vars {
  private readonly vars=Deno.env.toObject();


  *[Symbol.iterator](): Iterator<map<string,string>> {
    for(const key in this.vars) yield {
      key: key,
      value: this.vars[key]
    } satisfies map<string,string>;
  }

  public delete(key: string) {
    Deno.env.delete(key);
  }

  public get(key: string) {
    return new Option(Deno.env.get(key));
  }

  public has(key: string) {
    return Deno.env.has(key);
  }
  
  public set(key: string,value: string) {
    return Deno.env.set(key,value);
  }
}

const xd=new Vars();



