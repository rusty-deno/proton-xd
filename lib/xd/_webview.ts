import { WebViewAttributes,WindowTrait } from './mod.ts';



export abstract class WebViewTrait extends WindowTrait {
  protected _addrs=new BigUint64Array(2);
  protected abstract webviewAttrs: WebViewAttributes;
  






}



