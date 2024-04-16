import { MergeSorter } from "./MergeSorter";

const sortMethods = ['mergeSort'];

const sizes = [
  1000,
  100000
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


