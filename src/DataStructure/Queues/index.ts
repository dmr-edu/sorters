import { Queue } from "./Queue";

const queue = new Queue();

for (let i = 0; i < 5; i++) {
  queue.push(i * Math.floor(Math.random() * 10))
}

queue.print(true);

queue.forEach((n) => {
  const first = queue.peekNode();
  if (!first) return;
  if (first.value < n.value) {
    queue.replaceSiblings(first, n)
  }
})

queue.print(true);






