import { LinkedList } from "./LinkedList";
import { LinkedList2 } from "./LinkedList2";

const list = new LinkedList(0, null);
let element = list
for (let i = 1; i < 10; i++) {
  element.next = new LinkedList(i);
  element = element.next
}

const list2 = new LinkedList2(0, null);
let element2 = list2
for (let i = 1; i < 10; i++) {
  element2.next = new LinkedList2(i, null, element2);
  element2 = element2.next
}


const printinloopDown = (list) => {
  let element = list
  while (element) {
    console.log(element.value)
    element = element.next
  }
}
console.log('printinloopDown')
printinloopDown(list)

const printinloopUp = (list) => {
  let element = list
  while (element.next) {
    element = element.next
  }
  while (element) {
    console.log(element.value);
    element = element.prev
  }
}
console.log('printinloopUp')
printinloopUp(list2)

const printDown = (list) => {
  console.log(list.value)
  if (list.next) {
    printDown(list.next)
  }
}

const printUp = (list) => {
  if (list.next) {
    printUp(list.next)
  }
  console.log(list.value)
}

console.log('printDown')
printDown(list)


console.log('printUp')
printUp(list)

