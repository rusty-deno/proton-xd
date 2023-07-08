import * as linked_list from "./linked_list.ts";

export interface map<k,v> {
  key: k;
  value: v;
}


namespace collections {
  export const {default: LinkedList,Node}=linked_list;
  



}

export default collections;