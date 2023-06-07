import rust,{toBuffer} from './bindings.ts';

namespace fltk {
  const libSync=rust.symbols;
  export class Dialog {
    //message
    public static messageSync=(x: number,y: number,txt: string)=> libSync.message(x,y,toBuffer(txt));

    public static messageDefaultSync=(txt: string)=> libSync.message_default(toBuffer(txt));

    public static hotspot=libSync.message_hotspot;

    public static messageIconLabelSync=(label: string)=> libSync.message_icon_label(toBuffer(label));

    public static messageSetFontSync=(idx: Font,sz: number)=> libSync.message_set_font(idx,sz);

    public static messageSetHotspotSync=(enabled: boolean)=> libSync.message_set_hotspot(enabled);

    public static messageTitleSync=(title: string)=> libSync.message_title(toBuffer(title));

    public static messageTitleDefaultSync=(title: string)=> libSync.message_title_default(toBuffer(title));

    // alert

    public static alertSync=(x: number,y: number,txt: string)=> libSync.alert(x,y,toBuffer(txt));

    public static alertDefaultSync=(txt: string)=> libSync.alert_default(toBuffer(txt));

    //beep

    public static beepSync=(tp: BeepType)=> libSync.beep(tp);

    //color chooser
    public static colorChooserSync=(name: string,format: number)=>{
      const ptr=libSync.color_chooser(toBuffer(name),format);
      



    };



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
}

export default fltk;


