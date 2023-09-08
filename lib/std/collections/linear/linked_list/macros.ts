import { LinkedList } from "./linked_list.ts";


export function $linked_list<T>(...elements: T[]) {
  const ll=new LinkedList<T>();
  for(let i=elements.length;i>0;) ll.pushFront(elements[--i]);
  return ll;
}





