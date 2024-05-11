import { ArrayGenerator } from "../../../Sorts/ArrayGenerator";
import { LinkedList } from "./LinkedList";
import { Node } from "./Node";

const list = LinkedList.from([10, 2, 3, 4, 5, 6, 7]);
list.print(true)
list.removeAt(7);
list.bubbleSort()
list.print(true)

// const list = new LinkedList()
// list.unshift(new Node(2))
// list.print();
// list.printStructure()
// console.log(list.shift())
// const node4 = list.find(4)
// // console.log(node4)
// const bigger = list.find((n) => n.value > node4?.value, node4)
// list.replaceSiblings(node4, bigger)
// console.log(node4, bigger)
// list.printInLoop();
// const removed = list.removeBy(2);
// console.log({ removed })
// list.print(true)