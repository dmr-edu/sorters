import { Sorter } from "./Sorter";

export class InsertionSorter extends Sorter {
  static insertionSortOptimized(array) {
    let pos = 1
    let tmpPos;
    let tmp;
    while (pos < array.length) {
      if (array[pos] < array[pos - 1]) {
        tmp = array[pos];
        array[pos] = array[pos - 1];
        array[pos - 1] = tmp;
        pos = pos > 1 ? pos - 1 : tmpPos ? tmpPos : pos + 1
        tmpPos = tmpPos || pos + 1
        continue
      }
      pos++
    }
    return array
  }

  static insertionSort(array) {
    let pos = 1;
    let tmp;
    while (pos < array.length) {
      if (array[pos] < array[pos - 1]) {
        tmp = array[pos];
        array[pos] = array[pos - 1];
        array[pos - 1] = tmp;
        pos--
        continue
      }
      pos++
    }
    return array
  }
}
