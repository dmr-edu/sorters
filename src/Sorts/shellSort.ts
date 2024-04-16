import { ShellSorter } from "./ShellSorter";

const sortMethods = ['sort'];

const sizes = [
  500, 1000,
  100000
],
  digitsMaxValues = [
    10000
  ];
const config = {
  sorter: ShellSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

ShellSorter.runTestGroup(config)
