import rust,{toBuffer} from './bindings.ts';


namespace fltk {
  const lib=rust.symbols;
  export class Dialog {
    public static message=(x: number,y: number,txt: string)=> lib.message(x,y,toBuffer(txt));

    public static messageDefault=(txt: string)=> lib.message_default(toBuffer(txt));

    public static hotspot=lib.hotspot;

    public static messageIconLabel=(label: string)=> lib.message_icon_label(toBuffer(label));

    public static messageSetFont=(idx: Font,sz: number)=> lib.message_set_font(idx,sz);

    public static messageSetHotspot=(enabled: boolean)=> lib.message_set_hotspot(enabled);

    public static messageTitle=(title: string)=> lib.message_title(toBuffer(title));

    public static messageTitleDefault=(title: string)=> lib.message_title_default(toBuffer(title));
  }
  
  export enum Font {
    Helvetica=0,
    HelveticaBold=1,
    HelveticaItalic=2,
    HelveticaBoldItalic=3,
    Courier=4,
    CourierBold=5,
    CourierItalic=6,
    CourierBoldItalic=7,
    Times=8,
    TimesBold=9,
    TimesItalic=10,
    TimesBoldItalic=11,
    Symbol=12,
    Screen=13,
    ScreenBold=14,
    Zapfdingbats=15,
  }

  export const close=rust.close;
}

export default fltk;


