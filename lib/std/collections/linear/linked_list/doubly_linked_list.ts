import { LinkedList } from "./mod.ts";

export class DoublyLinkedList<T,U=T> extends LinkedList<[T,U]> {}
