import { BubbleSorter } from "./src/BubbleSorter";

const sortMethods = ['bubbleSort'];

const sizes = [
  500,
  10000,
  100000
],
  digitsMaxValues = [
    100,
    10000000
  ];
const config = {
  sorter: BubbleSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

BubbleSorter.runTestGroup(config)


