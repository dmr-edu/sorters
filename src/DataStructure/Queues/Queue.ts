import { LinkedList } from "../Lists/LinkedList/LinkedList";

export class Queue<T = number> {
  list: LinkedList<T>
  constructor() {
    this.list = new LinkedList<T>();
  }

  peekNode() {
    return this.list.head;
  }

  peek() {
    return this.list.head?.value
  }

  isEmpty() {
    return this.list.isEmpty()
  }

  print(...params: Parameters<LinkedList<T>['print']>) {
    this.list.print(...params)
  }

  push(...params: Parameters<LinkedList<T>['push']>) {
    this.list.push(...params);
  }

  shift() {
    return this.list.shift()
  }

  forEach(...params: Parameters<LinkedList<T>['forEach']>) {
    this.list.forEach(...params)
  }

  replaceSiblings(...params: Parameters<LinkedList<T>['replaceSiblings']>) {
    this.list.replaceSiblings(...params)
  }
}