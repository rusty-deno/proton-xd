import { LinkedList } from './linked_list.ts';

export class DoublyLinkedList<T,U=T> extends LinkedList<[T,U]> {}
