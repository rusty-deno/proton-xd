
interface Inner {
  xd: number;
}

type Dropable<T>=T&{
  [Symbol.dispose](): void;
};

class XD {
  public inner: Dropable<Inner>
  constructor(inner: Inner) {
    using dropable={
      [Symbol.dispose](): void {
        console.log(this.xd);
      },
      ...inner
    };

    this.inner=dropable;
  }
}


const _xd=new XD({ xd: 69 });



