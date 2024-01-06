import { symbols as allocator } from "../../bindings/bindings.ts";


type Touple<T>=[T,T];
type Pointer=Deno.PointerValue;

export function readPtr(ptr: Pointer,len: number) {
  return Deno.UnsafePointerView.getArrayBuffer(ptr!,len);
}


export function getI32Touple(ptr: Pointer): Touple<number> {
  const arr=new Int32Array(readPtr(ptr,8));
  const touple=[arr[0],arr[1]] satisfies Touple<number>;

  allocator.free(ptr);
  return touple;
}


export function getU32Touple(ptr: Pointer): Touple<number> {
  const arr=new Uint32Array(readPtr(ptr,8));
  const touple=[arr[0],arr[1]] satisfies Touple<number>;

  allocator.free(ptr);
  return touple;
}

export function getF64Touple(ptr: Pointer): Touple<number> {
  const arr=new Float64Array(readPtr(ptr,16));
  const touple=[arr[0],arr[1]] satisfies Touple<number>;

  allocator.free(ptr);
  return touple;
}


