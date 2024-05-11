export class Stack<T = number> {
  private list: T[] = [];

  isEmpty(): boolean {
    return this.list.length === 0;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.list[0]
  }

  print(inline: boolean = true): void {
    let str = '['
    this.list.forEach((i, ind) => {
      if (inline) str += (i + (ind < this.list.length - 1 ? ', ' : ''))
      else console.log(i)
    })
    if (inline) console.log(str + ']')
  }

  push(value: T) {
    this.list.unshift(value);
  }

  pop(): T | undefined {
    return this.list.shift()
  }
}