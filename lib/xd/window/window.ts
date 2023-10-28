import * as lib from "../../../bindings/bindings.ts";
import { MessageType,WindowAttributes } from "../types/window.ts";
import { confirmDefaultVal,defaultFileOpenerOptions,defaultSaveFileOptions } from "../default.ts";
import { WindowTrait } from './_window.ts';
import { encode } from "../../serde/encode.ts";





export class WindowXD extends WindowTrait {
  constructor(protected _window: bigint,protected windowAttrs: WindowAttributes={}) {
    super();
  }

  /**
  * Shows the given message with a pop-up window
  */
  public static async message(message: string,title="Info",type: MessageType="Info") {
    await lib.alert(message,title,encodeEnum(type));
  }

  /**
   * Shows the given message with a pop-up window
   */
  public static messageSync(message: string,title="Info",type: MessageType="Info") {
    lib.alert_sync(message,title,encodeEnum(type));
  }
  
  /**
   * Shows the given error with a error-pop-up window
   */
  public static async error(err="Some error occured!",title="Error") {
    await this.message(err,title,"Info");
  }

  /**
   * Shows the given error with a error-pop-up window
   */
  public static errorSync(err="Some error occured!",title="Error") {
    this.messageSync(err,title,"Error");
  }

  /**
   * Shows the given warning with a warning-pop-up window
   */
  public static async warn(warning: string,title="Warning") {
    await this.message(warning,title,"Warning");
  }

  /**
   * Shows the given warning with a warning-pop-up window
   */
  public static warnSync(warning: string,title="Warning") {
    this.messageSync(warning,title,"Warning");
  }

  /**
   * Shows a confirm pop-up returning boolean value
   */
  public static async confirm(txt: string,title="Confirm",type: MessageType="Info") {
    return await lib.symbols.confirm(encode(title),encode(txt),encodeEnum(type));
  }

  /**
   * Shows a confirm pop-up returning boolean value
   */
  public static confirmSync(txt: string,title="Confirm",type: MessageType="Info") {
    return lib.symbols.confirm_sync(encode(title),encode(txt),encodeEnum(type));
  }

  /**
   * Shows a choose-file pop-up window returning the file path
   */
  public static async chooseFile(options=defaultFileOpenerOptions) {
    const opt=confirmDefaultVal(options,defaultFileOpenerOptions);
    return await lib.open(JSON.stringify(opt));
  }

  /**
   * Shows a choose-file pop-up window returning the file path
   */
  public static chooseFileSync(options=defaultFileOpenerOptions) {
    const opt=confirmDefaultVal(options,defaultFileOpenerOptions);
    return  lib.open_sync(JSON.stringify(opt));
  }

  /**
   * Shows a save-file pop-up window returning the file path
   */
  public static async save(options=defaultSaveFileOptions) {
    return await lib.save(JSON.stringify(options));
  }

  /**
   * Shows a save-file pop-up window returning the file path
   */
  public static saveSync(options=defaultSaveFileOptions) {
    return lib.save_sync(JSON.stringify(options));
  }

}










function encodeEnum(type: MessageType) {
  switch(type) {
    case "Info": return 0;
    case 'Warning': return 1;
    case 'Error': return 2;
  }
}