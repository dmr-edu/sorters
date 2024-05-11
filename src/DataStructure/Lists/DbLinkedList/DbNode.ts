export class DbNode<T = number> {
  value: T;
  next: DbNode<T> | null;
  prev: DbNode<T> | null;

  constructor(
    value: T,
    next: DbNode<T> | null = null,
    prev: DbNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev
  }

  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : `${this.value}`
  }
}