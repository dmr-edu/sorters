import { Sorter } from "./Sorter";

export class BubbleSorter extends Sorter {
  static bubbleSort(array) {
    let i = array.length - 1;
    let tmp;
    let hasReplacment = false
    while (i > 1) {
      hasReplacment = false
      for (let j = 0; j < i; j++) {
        if (array[j] > array[j + 1]) {
          hasReplacment = true
          tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
      }
      if (!hasReplacment) break;
      i--;
    }
    return array;
  }

  static bubbleSortSlow(array) {
    let i = array.length - 1;
    let tmp;
    while (i > 1) {
      for (let j = 0; j < i; j++) {
        if (array[j] > array[j + 1]) {
          tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
      }
      i--;
    }
    return array;
  }
}
