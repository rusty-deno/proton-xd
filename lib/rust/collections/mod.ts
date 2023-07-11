import LinkedList, * as linked_list_mod from "./linked_list.ts";
import HashMap,* as hash_map_mod from "./hash_map.ts";
import Vec, * as vec from "./vector.ts";
import List, * as list from "./List.ts";
import HashSet,* as hash_set from './hash_set.ts';

export * from "./hash_map.ts";
export * from "./hash_set.ts";
export * from "./linked_list.ts";
export * from "./vector.ts";
export {
  HashMap,
  LinkedList,
  Vec,
  List,
  HashSet,
};



module collections {
  export module linked_list {
    export const {Node}=linked_list_mod;

    export class LinkedList<T> extends linked_list_mod.default<T> {}
  }
  
  export module hash_map {
    export class HashMap<K,V> extends hash_map_mod.default<K,V> {}


    export const {hash}=hash_map_mod;
    export type Entry<K,V>=hash_map_mod.Entry<K,V>;
  }
  
  export abstract class List<T> extends list.default<T> {}
  export class Vec<T> extends vec.default<T> {}
  export class HashMap<K,V> extends hash_map_mod.default<K,V> {}
  export class LinkedList<T> extends linked_list_mod.default<T> {}
  export class HashSet<T> extends hash_set.default<T> {}
}

export default collections;


