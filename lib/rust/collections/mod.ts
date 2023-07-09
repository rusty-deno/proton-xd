import * as linked_list_mod from "./linked_list.ts";
import * as hash_map_mod from "./hash_map.ts";
import * as vec from "./vector.ts";
import * as list from "./List.ts";




module collections {
  export module linked_list {
    export const {LinkedList,Node}=linked_list_mod.default;
  }
  
  export module hash_map {
    export const {HashMap,hash}=hash_map_mod.default;
    export type Entry<K,V>=hash_map_mod.default.Entry<K,V>;
  }
  
  export const List=list.default;
  export const Vec=vec.default;
  export const HashMap=hash_map.HashMap;
  export const LinkedList=linked_list.LinkedList;
}

export const {LinkedList,Node,HashMap}={
  ...linked_list_mod.default,
  ...hash_map_mod.default
};
export const Vec=vec.default;

export default collections;