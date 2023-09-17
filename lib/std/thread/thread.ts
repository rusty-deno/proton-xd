import { lib } from "../../../bindings/bindings.ts";
import { Some,None } from "../mod.ts";




/**
 * Initiates a parallel thread.
 * 
 * # Example
 * ```ts
 * const thread=new Thread(()=> 69);
 * $assertEq(await thread.spawn(),69);
 * 
 * ```
 * @unstable
 */
export class Thread<T> {
  /** Return value of the {@linkcode Thread} */
  private xd=None<T>(null);
  /** The Function Pointer run the {@linkcode Thread} */
  private fn: Deno.UnsafeCallback<{
    parameters: [],
    result: "void"
  }>;
  /** Name of the {@linkcode Thread} */
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
  
  /**
   * It looks just like a {@linkcode Promise}.
   * 
   * But the difference is that it spawns a parellel {@linkcode Thread} on a diffarent cpu core.
   * 
   * `Awaiting` it joins the parellel {@linkcode Thread}
   * 
   * # Example
   * ```
   * $assertEq(await Thread.spawn(()=> 69),69);
   * ```
   */
  public async spawn(): Promise<T> {
    await lib.symbols.spawn(this.fn.pointer);
    this.fn.close();
    return this.xd.value as T;
  }

  /** Terminates the current {@linkcode Thread} */
  public terminate() {
    this.fn.close();
    return this.xd;
  }

  /**
   * It looks just like a {@linkcode Promise}.
   * 
   * But the difference is that it spawns a parellel {@linkcode Thread} on a diffarent cpu core.
   * 
   * `Awaiting` {@linkcode Thread.spawn} joins the parellel {@linkcode Thread}
   * 
   * # Example
   * ```
   * $assertEq(await Thread.spawn(()=> 69),69);
   * ```
   */
  public static async spawn<T>(callback: ()=> T,name?: string) {
    return await new Thread(callback,name).spawn();
  }
}

