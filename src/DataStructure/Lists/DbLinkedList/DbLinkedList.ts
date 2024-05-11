import { DbNode } from "./DbNode";

type TToStringCallback<T> = (value: DbNode<T>['value']) => string

export class DbLinkedList<T = number> {
  head: DbNode<T> | null;
  tail: DbNode<T> | null;
  constructor(node?: DbNode<T>) {
    this.head = node || null;
    this.tail = node || null
  }

  remove(): void {
    this.head = null;
    this.tail = null;
  }

  private _createNode(value: DbNode<T>['value'], next: DbNode<T>['next'] = null, prev: DbNode<T>['prev'] = null): DbNode<T> {
    return new DbNode<T>(value, next, prev)
  }

  isEmpty(): boolean {
    return !(this.head && this.tail)
  }

  /**
   * Поиск элемента в списке
   * @param target Искомое начение или функция принимающая элемент списка и возвращающая true если передан искомый элемент,  иначе - false
   * @param untilNode До какого элемента вести поиск
   * @returns Искомый элемент или null
   */
  find(target: DbNode<T>['value'] | ((node: DbNode<T>) => boolean), untilNode: DbNode<T> | null = null): DbNode<T> | null {
    if (this.isEmpty()) return null;
    let element = this.head;
    let result: DbNode<T> | null = null;
    while (element) {
      if (element === untilNode) break;
      if ((target instanceof Function && target(element))
        || (typeof target !== 'function' && target === element.value)) {
        result = element
        break;
      }
      element = element.next
    }
    return result
  }

  /**
   * Сортировка пузырьком
   * @param sorter Функция колл-бэк которая принимает значения двух соседних элементов
   * и возвращающая true в случае если значения нужно переставить местами и false - есл иперестановка не требуется
   * @returns void
   */
  bubbleSort(sorter?: (a: DbNode<T>['value'], b: DbNode<T>['value']) => boolean) {
    if (this.isEmpty() || this.head?.next === null) return;
    let firstSortedElement: DbNode<T> | null = null;
    while (firstSortedElement !== this.head?.next) {
      this.while((node) => {
        if (!firstSortedElement && node.next === null) {
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

  findAt(position: number): DbNode<T> | null {
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
      if (!node || (!node.next && i === position)) {
        console.log('The list is too short. End position - ', i);
        node = null;
        break;
      };
      node = node.next
    }
    return node;
  }

  insertAt(position: number, value: DbNode<T>['value']): boolean {
    if (position === 0) {
      this.unshift(value)
      return true;
    }
    const node = this.findAt(position - 1);
    if (!node) return false;
    node.next = this._createNode(value, node.next, node);
    return true;
  }

  removeAt(position: number): DbNode<T> | null {
    if (this.isEmpty()) return null;
    if (position === 0) {
      return this.shift();
    }
    const node = this.findAt(position);
    if (!node) {
      console.log('The list is too short');
      return null;
    };
    const next = node.next || null;
    if (!node.prev) return null;
    node.prev.next = next;
    if (next) {
      next.prev = node.prev;
    }
    this.tail = next ? this.tail : node
    node.next = null;
    node.prev = null
    return node
  }

  removeBy(value: DbNode<T>['value']): DbNode<T> | null {
    if (this.isEmpty()) return null;
    let result: DbNode<T> | null = null;
    if (this.head?.value === value) {
      result = this.head;
      this.head = this.head?.next!
      this.head.prev = null
      if (result && result.next) {
        result.next = null
      }
      return result;
    }
    let prevNode: DbNode<T> | null = null;
    this.while((node) => {
      if (node.next?.value === value) {
        prevNode = node;
        result = prevNode.next;
        prevNode.next = result ? result.next : null;
        if (prevNode.next) prevNode.next.prev = prevNode
        this.tail = prevNode?.next ? this.tail : node
        if (result) {
          result.next = null;
          result.prev = null
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
  unshift(value: DbNode<T>['value']): this {
    const node = this._createNode(value, this.head);
    this.head = node;
    if (this.head.next) this.head.next.prev = this.head
    if (!this.tail) this.tail = node

    return this
  }

  push(value: DbNode<T>['value']): this {
    const node = this._createNode(value);
    if (!this.tail || !this.head) {
      this.tail = node
      this.head = node
    } else {
      this.tail.next = this._createNode(value, null, this.tail);
      this.tail = this.tail.next
    }

    return this
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
      if (node.next) {
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

    const _printList = (node: DbNode<T>) => {
      const value = node.toString(callback);
      if (inline)
        str.push(value)
      else
        console.log(value)
      if (node.prev) {
        _printList(node.prev)
      }
    }
    _printList(this.tail!);
    if (str.length > 0) console.log(str);
    return this
  }

  forEach(callback: (node: DbNode<T>) => void): this {
    if (this.isEmpty()) return this;
    let element = this.head
    while (element) {
      callback(element);
      element = element.next
    }
    return this
  }

  forEachReverse(callback: (node: DbNode<T>) => void): this {
    if (this.isEmpty()) return this;
    let element = this.tail
    while (element) {
      callback(element);
      element = element.prev
    }
    return this
  }

  while(callback: (node: DbNode<T>) => boolean): this {
    if (this.isEmpty()) return this;
    let element = this.head;
    while (element) {
      if (callback(element)) {
        break;
      }
      element = element.next
    }
    return this
  }

  some(callback: (node: DbNode<T>) => boolean): boolean {
    if (this.isEmpty()) return false;
    let element = this.head;
    while (element) {
      if (callback(element)) {
        return true
      }
      element = element.next
    }
    return false
  }

  shift(): DbNode<T> | null {
    if (this.isEmpty()) return null;
    let node = this.head;
    if (this.head === this.tail) {
      this.remove();
      return node;
    }
    this.head = this.head?.next || null;
    this.head && (this.head.prev = null)
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
    if (inline) {
      let str: string[] = [];
      this.forEachReverse((node) => {
        str.push(node.toString(callback))
      });
      console.log(JSON.stringify(str))
    } else
      this.forEachReverse((node) => console.log(node.toString(callback)))
    return this;
  }

  toArray() {
    const result: DbNode<T>['value'][] = [];
    if (this.isEmpty()) return result;
    this.forEach((node) => {
      result.push(node.value)
    })
    return result;
  }

  static from(values: DbNode['value'][] = []): DbLinkedList {
    const list = new DbLinkedList();
    values.forEach((v) => list.push(v))
    return list;
  }

  replaceSiblings(a: DbNode<T> | null, b: DbNode<T> | null): this {

    if (this.isEmpty() || !(a && b)) return this
    const tmp = a.value;
    a.value = b.value;
    b.value = tmp

    return this
  }

  contains(value: DbNode<T>['value']): boolean {
    return this.some((n) => n.value === value);
  }

}
