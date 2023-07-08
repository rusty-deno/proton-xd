import * as linked_list_mod from "./linked_list.ts";
import * as hash_map_mod from "./hash_map.ts";

export interface map<k,v> {
  key: k;
  value: v;
}


namespace collections {
  export namespace linked_list {
    export const {default: LinkedList,Node}=linked_list_mod;
  }
  
  export namespace hash_map {
    export const HashMap=hash_map_mod.default;
    export type Pair<K,V>=hash_map_mod.Pair<K,V>;
  }
  
  export const LinkedList=linked_list_mod.default;
  export const HashMap=hash_map_mod.default;
}

export default collections;