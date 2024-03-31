import { RadixSorter } from "./RadixSorter";

console.log(JSON.stringify(RadixSorter.runTest({
  sorter: RadixSorter,
  method: 'sortByLowerOrder',
  generateFunc: 'generateArr'
}), null, 4))

console.log(JSON.stringify(RadixSorter.runTest({
  sorter: RadixSorter,
  method: 'sortByLowerOrder',
  generateFunc: 'generateSortedArrayWithmixedNumberOfValuePairs'
}), null, 4))
