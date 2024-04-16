import { RadixSorter } from "./RadixSorter";

const sortMethods = ['sortByLowerOrder', 'sortByOlderOrder'];

const sizes = [
  10000
],
  digitsMaxValues = [
    10,
    10000,
    10000000
  ];
const config = {
  sorter: RadixSorter,
  times: 10,
  sizes,
  digitsMaxValues,
  sortMethods
}

RadixSorter.runTestGroup(config)
