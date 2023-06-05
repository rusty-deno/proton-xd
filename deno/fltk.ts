import rust,{encoder} from './bindings.ts';


namespace fltk {
  const lib=rust.symbols;
  export class Dialog {
    public static message=(x: number,y: number,txt: string)=> lib.message(x,y,encoder.encode(txt));

    public static messageDefault=(txt: string)=> lib.message_default(encoder.encode(txt));

    public static hotspot=lib.hotspot;

    

  }



  const close=rust.close;
}

export default fltk;


