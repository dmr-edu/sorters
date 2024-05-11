import { ArrayGenerator } from "../../../Sorts/ArrayGenerator";
import { DbLinkedList } from "./DbLinkedList";


const list = DbLinkedList.from(ArrayGenerator.generateRandomArray(10, 100));
list.print(true)
// list.removeAt(1)

// Сортировка по убыванию
// ["-57","24","53","-66","-24","-57","12","78","-85","-72"]
list.bubbleSort((a, b) => a < b);
// Output: ["78","53","24","12","-24","-57","-57","-66","-72","-85"]

list.print();
// console.log(list.find(37))
// list.printInLoopReverse(true)