import { Node } from "./Node";

type TToStringCallback<T> = (value: Node<T>['value']) => string

export class CircularLinkedList<T = number> {
  head: Node<T> | null;
  constructor(node?: Node<T>) {
    this.head = node || null;
  }

  remove(): void {
    this.head = null;
  }

  private _createNode(value: Node<T>['value'], next: Node<T>['next'] = null): Node<T> {
    return new Node<T>(value, next)
  }

  isEmpty(): boolean {
    return !(this.head)
  }

  /**
   * Поиск элемента в списке
   * @param target Искомое начение или функция принимающая элемент списка и возвращающая true если передан искомый элемент,  иначе - false
   * @param untilNode До какого элемента вести поиск
   * @returns Искомый элемент или null
   */
  find(target: Node<T>['value'] | ((node: Node<T>) => boolean), untilNode: Node<T> | null = null): Node<T> | null {
    if (this.isEmpty()) return null;
    let element = this.head;
    let result: Node<T> | null = null;
    while (element) {
      if (element === untilNode) break;
      if ((target instanceof Function && target(element))
        || (typeof target !== 'function' && target === element.value)) {
        result = element
        break;
      }
      element = element.next;
      if (element === this.head) break;
    }
    return result
  }

  /**
   * Сортировка пузырьком
   * @param sorter Функция колл-бэк которая принимает значения двух соседних элементов
   * и возвращающая true в случае если значения нужно переставить местами и false - если иперестановка не требуется
   * @returns void
   */
  bubbleSort(sorter?: (a: Node<T>['value'], b: Node<T>['value']) => boolean) {
    if (this.isEmpty() || this.head?.next === null) return;
    let firstSortedElement: Node<T> | null = null;
    while (firstSortedElement !== this.head?.next) {
      this.while((node) => {
        if (!firstSortedElement && node.next === this.head) {
          firstSortedElement = node;
          return false;
        }
        if (firstSortedElement === node.next) {
          firstSortedElement = node;
          return true
        }
        if (sorter) {
          if (node.next?.value && sorter(node.value, node.next?.value)) {
            this.replaceSiblings(node, node.next)
            return true
          }
        } else if (node.next?.value && node.value > node.next?.value) {
          this.replaceSiblings(node, node.next)
          return true
        }
        return false
      })
    }
  }

  findAt(position: number): Node<T> | null {
    if (this.isEmpty()) {
      console.log('The list is empty');
      return null
    }
    if (!isFinite(position)) {
      console.log('Pass the correct position argument');
      return null
    }
    let node = this.head;
    for (let i = 1; i <= position; i++) {
      if (!node || (!node.next && i === position) || node.next === this.head) {
        console.log('The list is too short. End position - ', i);
        node = null;
        break;
      };
      node = node.next
    }
    return node;
  }

  insertAt(position: number, value: Node<T>['value']): boolean {
    if (position === 0) {
      this.unshift(value)
      return true;
    }
    const newNode = this._createNode(value);
    const node = this.findAt(position - 1);
    if (!node) return false;
    const next = node.next;
    node.next = newNode;
    newNode.next = next;
    return true;
  }

  removeAt(position: number) {
    if (this.isEmpty()) return;
    if (position === 0) {
      this.shift()
      return;
    }
    // Find previous node
    const node = this.findAt(position - 1);
    console.log({ node })
    if (!node || node?.next == this.head) {
      console.log('The list is too short');
      return;
    };
    const next = node.next?.next || null;
    node.next = next
  }

  removeBy(value: Node<T>['value']): Node<T> | null {
    if (this.isEmpty()) return null;
    let result: Node<T> | null = null;
    if (this.head?.value === value) {
      result = this.head;
      this.head = this.head?.next!
      if (result) {
        result.next = null
      }
      return result;
    }
    let prevNode: Node<T> | null = null;
    this.while((node) => {
      if (node.next?.value === value) {
        prevNode = node;
        result = prevNode.next;
        prevNode.next = result ? result.next : null;
        if (result && result.next) {
          result.next = null
        }
        return true
      }
      return false
    })

    return result
  }

  /**
   * Insert element at the beggining of the list
   * @param value Value for new node
   * @returns this
   */
  unshift(value: Node<T>['value']): this {
    if (this.isEmpty()) {
      this.head = this._createNode(value);
      return this;
    }
    const last = this.findLast();
    if (!last) return this;

    const node = this._createNode(value, this.head);
    this.head = node;
    last.next = this.head
    return this
  }

  findLast(): Node<T> | null {
    if (this.isEmpty()) return null;
    let last: Node<T> | null = null;
    this.while((n) => {
      if (n.next === this.head) {
        last = n;
        return true;
      }
      return false
    });
    return last;
  }

  push(value: Node<T>['value']): this {
    if (this.isEmpty()) {
      this.head = this._createNode(value);
      return this;
    }
    const node = this._createNode(value, this.head);

    if (this.head?.next === null) {
      this.head.next = node;
      return this;
    }
    const last = this.findLast();
    if (!last) return this;

    last.next = node
    return this
  }

  printStructure(): void {
    console.log(JSON.stringify(this.head, null, 2))
  }

  print(inline: boolean = true, callback?: TToStringCallback<T>): this {
    if (this.isEmpty()) return this;
    const str: string[] = [];

    const _printList = (node) => {
      const value = node.toString(callback);
      if (inline)
        str.push(value)
      else
        console.log(value)
      if (node.next && (node.next !== this.head)) {
        _printList(node.next)
      }
    }
    _printList(this.head)
    if (str.length > 0) console.log(JSON.stringify(str))
    return this
  }

  printReverse(inline: boolean = true, callback?: TToStringCallback<T>): this {
    if (this.isEmpty()) return this;
    const str: string[] = [];

    const _printList = (node: Node<T>) => {
      if (node.next && (node.next !== this.head)) {
        _printList(node.next)
      }
      const value = node.toString(callback);
      if (inline)
        str.push(value)
      else
        console.log(value)
    }
    _printList(this.head!);
    if (str.length > 0) console.log(str);
    return this
  }

  forEach(callback: (node: Node<T>) => void): this {
    if (this.isEmpty()) return this;
    let element = this.head
    while (element) {
      callback(element);
      element = element.next
      if (element === this.head) break;
    }
    return this
  }

  forEachReverse(callback: (node: Node<T>) => void): this {
    if (this.isEmpty()) return this;
    const _forEach = (node: Node<T>) => {
      if (node.next && (node.next !== this.head)) {
        _forEach(node.next)
      }
      callback(node)
    }
    _forEach(this.head!)
    return this
  }

  while(callback: (node: Node<T>) => boolean): this {
    if (this.isEmpty()) return this;
    let element = this.head;
    while (element) {
      if (callback(element)) {
        break;
      }
      element = element.next
      if (element === this.head) break;
    }
    return this
  }

  some(callback: (node: Node<T>) => boolean): boolean {
    if (this.isEmpty()) return false;
    let element = this.head;
    while (element) {
      if (callback(element)) {
        return true;
      }
      element = element.next
      if (element === this.head) break;
    }
    return false
  }

  shift(): Node<T> | null {
    if (this.isEmpty()) return null;
    let node = this.head;
    if (this.head?.next === null) {
      this.remove();
      return node;
    }

    const last = this.findLast();
    this.head = this.head!.next
    last!.next = this.head;
    return node;
  }

  printInLoop(inline: boolean = true, callback?: TToStringCallback<T>): this {
    if (inline) {
      let str: string[] = [];
      this.forEach((node) => {
        str.push(node.toString(callback))
      })
      console.log(JSON.stringify(str))
      return this;
    }
    this.forEach((node) => {
      console.log(node.toString(callback))
    })
    return this;
  }

  printInLoopReverse(inline: boolean = true, callback?: TToStringCallback<T>): this {
    let str: string[] = [];
    this.forEach((node) => {
      str.unshift(node.toString(callback))
    });
    if (inline)
      console.log(JSON.stringify(str))
    else
      str.forEach((v) => console.log(v))
    return this;
  }

  toArray() {
    const result: Node<T>['value'][] = [];
    if (this.isEmpty()) return result;
    this.forEach((node) => {
      result.push(node.value)
    })
    return result;
  }

  static from<T = any>(values: T[] = []): CircularLinkedList<T> {
    const list = new CircularLinkedList<T>();
    values.forEach((v) => list.push(v))
    return list;
  }

  replaceSiblings(a: Node<T> | null, b: Node<T> | null): this {

    if (this.isEmpty() || !(a && b)) return this
    const tmp = a.value;
    a.value = b.value;
    b.value = tmp

    return this
  }

  contains(value: Node<T>['value']): boolean {
    return this.some((n) => n.value === value);
  }

}
