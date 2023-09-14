// deno-lint-ignore-file no-explicit-any
import { Entry,HashMap } from "../hash_map/mod.ts";

type UnorderedMap<K,V>=(K extends keyof any?Record<K,V>:Iterable<Entry<K,V>>)|Iterable<Entry<K,V>>;

/**
 * Constructs a {@linkcode HashMap} from any type of supported object.
 * 
 * # Example
 * ```ts
 * const map=$map({
 *    xd: 69,
 *    xD: 69
 * });
 * const map1=$map([
 *    ["xd",69],
 *    ["xD",69]
 * ]);
 * 
 * $assertEq(map,map1);
 * ```
 */
export function $map<K,V>(_map: UnorderedMap<K,V>): HashMap<K,V> {
  const map=_map as any;
  return map[Symbol.iterator] instanceof Function?HashMap.fromIter(map):HashMap.formRecord<any,V>(map);
}


