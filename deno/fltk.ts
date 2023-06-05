import rust,{toBuffer} from './bindings.ts';


namespace fltk {
  const lib=rust.symbols;
  export class Dialog {
    //message
    public static message=(x: number,y: number,txt: string)=> lib.message(x,y,toBuffer(txt));

    public static messageDefault=(txt: string)=> lib.message_default(toBuffer(txt));

    public static hotspot=lib.hotspot;

    public static messageIconLabel=(label: string)=> lib.message_icon_label(toBuffer(label));

    public static messageSetFont=(idx: Font,sz: number)=> lib.message_set_font(idx,sz);

    public static messageSetHotspot=(enabled: boolean)=> lib.message_set_hotspot(enabled);

    public static messageTitle=(title: string)=> lib.message_title(toBuffer(title));

    public static messageTitleDefault=(title: string)=> lib.message_title_default(toBuffer(title));

    // alert

    public static alert=(x: number,y: number,txt: string)=> lib.alert(x,y,toBuffer(txt));

    public static alertDefault=(txt: string)=> lib.alert_default(toBuffer(txt));

    //beep

    public static beep=(tp: BeepType)=> lib.beep(tp);

    



  }
  
  export enum Font {
    Helvetica,
    HelveticaBold,
    HelveticaItalic,
    HelveticaBoldItalic,
    Courier,
    CourierBold,
    CourierItalic,
    CourierBoldItalic,
    Times,
    TimesBold,
    TimesItalic,
    TimesBoldItalic,
    Symbol,
    Screen,
    ScreenBold,
    Zapfdingbats,
  }

  export enum BeepType {
    Default,
    Message,
    Error,
    Question,
    Password,
    Notification,
  }

  export const close=rust.close;
}

export default fltk;


