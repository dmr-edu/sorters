import { InsertionSorter } from "./InsertionSorter";

const sortMethods = ['insertionSortOptimized'];

const sizes = [
  500,
  10000
],
  digitsMaxValues = [
    100000
  ];
const config = {
  sorter: InsertionSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

InsertionSorter.runTestGroup(config)


