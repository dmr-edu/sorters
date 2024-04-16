export class LinkedList2 {
  value;
  next;
  prev;
  constructor(value, next = null, prev: LinkedList2 | null = null) {
    this.value = value;
    this.next = next;
    this.prev = prev
  }
}