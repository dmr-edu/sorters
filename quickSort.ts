import { QuickSorter } from "./src/QuickSorter";

const sortMethods = ['quickSortOptimized', 'quickSort'];

const sizes = [
  5000,
  10000,
  10000000
],
  digitsMaxValues = [
    10000,
    1000000000
  ];
const config = {
  sorter: QuickSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

QuickSorter.runTestGroup(config)
