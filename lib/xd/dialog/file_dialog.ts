// deno-lint-ignore-file no-explicit-any
import * as lib from "../../../bindings/bindings.ts";


export class FileDialog {
  #ptr: bigint;
  #moved=false;

  constructor() {
    this.#ptr=BigInt(lib.new_file_dialog());
  }

  
  private static ref(self: FileDialog,_: PropertyKey,descriptor: PropertyDescriptor) {
    const original=descriptor.value!;

    descriptor.value=function(...args: any[]) {
      if(self.#moved) self.#ptr=BigInt(lib.new_file_dialog());
      return original.apply(this,args);
    };
  
    return descriptor;
  }

  private static move(self: FileDialog,_: PropertyKey,descriptor: PropertyDescriptor) {
    const original=descriptor.value!;

    descriptor.value=function(...args: any[]) {
      self.#moved=true;
      return original.apply(this,args);
    };

    return descriptor;
  }



  @FileDialog.ref
  public addFilter(desc: string,extensions: string[]) {
    lib.file_dialog_add_filter(this.#ptr,desc,JSON.stringify(extensions));
  }

  @FileDialog.ref
  public removeAllFilters() {
    lib.file_dialog_remove_all_filters(this.#ptr);
  }

  @FileDialog.ref
  public resetFilename() {
    lib.file_dialog_reset_filename(this.#ptr);
  }

  @FileDialog.ref
  public resetLocation() {
    lib.file_dialog_reset_location(this.#ptr);
  }

  @FileDialog.ref
  public resetOwner() {
    lib.file_dialog_reset_owner(this.#ptr);
  }



}



