import { InsertionSorter } from "./InsertionSorter";
import { Sorter } from "./Sorter";

export class ShellSorter extends Sorter {
  static sort(array, step) {
    const _step = step || Math.round(array.length / 2);
    let i = 0;
    let tmp;
    let next = _step
    while (i + _step < array.length) {
      if (array[i] >= array[next]) {
        tmp = array[i];
        array[i] = array[next];
        array[next] = tmp;
      }
      i++;
      next++
    }
    return step === 1 ? InsertionSorter.insertionSort(array) : ShellSorter.sort(array, Math.round(_step / 2))
  }
}
