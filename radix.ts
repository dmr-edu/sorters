import { RadixSorter } from "./src/RadixSorter";

const sortMethods = ['sortByLowerOrder', 'sortByOlderOrder'];

const sizes = [
  100000,
  10000000
],
  digitsMaxValues = [
    10000,
    1000000000
  ];
const config = {
  sorter: RadixSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

RadixSorter.runTestGroup(config)
