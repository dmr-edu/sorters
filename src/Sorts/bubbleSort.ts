import { BubbleSorter } from "./BubbleSorter";

const sortMethods = ['bubbleSort', 'bubbleSortSlow'];

const sizes = [
  1000,
],
  digitsMaxValues = [
    10000
  ];
const config = {
  sorter: BubbleSorter,
  times: 10,
  sizes,
  digitsMaxValues,
  sortMethods
}

BubbleSorter.runTestGroup(config)


