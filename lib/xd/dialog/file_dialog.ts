
import { PathBuf } from "../../std/path.ts";
import * as lib from "../../../bindings/bindings.ts";
import { $resultSync } from "../../std/error/result/mod.ts";



export class FileDialog {
  #ptr: bigint;
  #moved=false;

  constructor() {
    this.#ptr=FileDialog.#alloc();
  }

  static #alloc() {
    return BigInt(lib.new_file_dialog());
  }

  static #borrow(self: FileDialog,_: PropertyKey,descriptor: PropertyDescriptor) {
    const original=descriptor.value!;

    // deno-lint-ignore no-explicit-any
    descriptor.value=function(...args: any[]) {
      if(self.#moved) self.#ptr=FileDialog.#alloc();
      return original.apply(this,args);
    };
  
    return descriptor;
  }


  #move<T>(f: (ptr: bigint)=> T) {
    const ptr=this.#moved?FileDialog.#alloc():this.#ptr;
    this.#moved=true;

    return $resultSync(()=> f(ptr));
  }



  @FileDialog.#borrow
  public addFilter(desc: string,extensions: string[]) {
    return $resultSync(()=> lib.file_dialog_add_filter(this.#ptr,desc,JSON.stringify(extensions)));
  }

  @FileDialog.#borrow
  public removeAllFilters() {
    lib.file_dialog_remove_all_filters(this.#ptr);
  }

  @FileDialog.#borrow
  public resetFilename() {
    lib.file_dialog_reset_filename(this.#ptr);
  }

  @FileDialog.#borrow
  public resetLocation() {
    lib.file_dialog_reset_location(this.#ptr);
  }

  @FileDialog.#borrow
  public resetOwner() {
    lib.file_dialog_reset_owner(this.#ptr);
  }

  @FileDialog.#borrow
  public setFilename(filename: PathBuf) {
    return $resultSync(()=> lib.file_dialog_set_filename(this.#ptr,filename.toString()));
  }

  @FileDialog.#borrow
  public setLocation(location: PathBuf) {
    return $resultSync(()=> lib.file_dialog_set_location(this.#ptr,location.toString()));
  }

  @FileDialog.#borrow
  public setTitle(title: string) {
    lib.file_dialog_set_title(this.#ptr,title);
  }


  public showOpenFile() {
    return this.#move(lib.file_dialog_show_open_single_file);
  }

  public showOpenMultipleFiles() {
    return this.#move(lib.file_dialog_show_open_multiple_file);
  }
  
  public showOpenDir() {
    return this.#move(lib.file_dialog_show_open_single_dir);
  }
  
  public showSaveFile() {
    return this.#move(lib.file_dialog_show_save_single_file);
  }
}



