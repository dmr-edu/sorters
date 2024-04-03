import { ShellSorter } from "./src/ShellSorter";

const sortMethods = ['sort'];

const sizes = [
  100,
  10000,
  10000000
],
  digitsMaxValues = [
    10000,
    1000000000
  ];
const config = {
  sorter: ShellSorter,
  times: 20,
  sizes,
  digitsMaxValues,
  sortMethods
}

ShellSorter.runTestGroup(config)
