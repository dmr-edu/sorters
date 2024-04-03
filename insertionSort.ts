import { InsertionSorter } from "./src/InsertionSorter";

const sortMethods = ['insertionSort'];

const sizes = [
  5000,
  10000,
  1000000
],
  digitsMaxValues = [
    100,
    1000000
  ];
const config = {
  sorter: InsertionSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

InsertionSorter.runTestGroup(config)


