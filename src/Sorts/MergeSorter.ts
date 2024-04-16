import { Sorter } from "./Sorter";

export class MergeSorter extends Sorter {
  static mergeSort = (arr) => {
    if (arr.length === 1)
      return arr;
    const [half1, half2] = this.split(arr)
    return this.mergeArrays(this.mergeSort(half1), this.mergeSort(half2))
  }

  static mergeArrays = (arr1, arr2) => {
    const merged: any[] = [];
    let arr1Index = 0;
    let arr2Index = 0;
    while (arr2Index < arr2.length) {
      while (arr1Index < arr1.length) {
        if (arr1[arr1Index] < arr2[arr2Index] || arr2Index === arr2.length) {
          merged.push(arr1[arr1Index]);
          arr1Index++;
          continue
        }
        merged.push(arr2[arr2Index]);
        arr2Index++;
      }
      if (arr2Index === arr2.length) break;
      merged.push(arr2[arr2Index]);
      arr2Index++;
    }
    return merged
  }
  static split(array) {
    const firs: any[] = [];
    const second: any[] = [];
    const middle = Math.floor(array.length / 2);
    for (let i = 0; i < array.length; i++) {
      if (i < middle) {
        firs.push(array[i]);
        continue
      }
      second.push(array[i])
    }
    return [firs, second]
  }
}

// console.log(MergeSorter.mergeSort(ArrayGenerator.generateRandomArray(9, 1000)))