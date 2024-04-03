import { MergeSorter } from "./src/MergeSorter";

const sortMethods = ['mergeSort'];

const sizes = [
  5000,
  100000,
  1000000
],
  digitsMaxValues = [
    100,
    10000000
  ];
const config = {
  sorter: MergeSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

MergeSorter.runTestGroup(config)


