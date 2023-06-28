export default interface ErrorHandler<T,E> {
  
  unwrap(): T;
  unwrapOrElse(f: (err: E)=> T): T;
}