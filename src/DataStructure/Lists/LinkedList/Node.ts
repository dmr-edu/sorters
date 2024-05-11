export class Node<T = number> {
  value: T;
  next: Node<T> | null
  constructor(value, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`
  }
}