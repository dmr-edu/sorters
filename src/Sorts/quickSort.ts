import { QuickSorter } from "./QuickSorter";

const sortMethods = ['quickSortOptimized'];

const sizes = [
  1000,
  100000,
  1000000
],
  digitsMaxValues = [
    10000
  ];
const config = {
  sorter: QuickSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

QuickSorter.runTestGroup(config)
