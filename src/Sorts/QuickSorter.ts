import { Sorter } from "./Sorter";

export class QuickSorter extends Sorter {

  static quickSort(array: number[] = [], start = 0, end = array.length - 1) {
    let middle = start + Math.round((end - start) / 2);
    let startI = start;
    let endI = end;
    let tmp;
    while (startI <= endI) {
      while (startI <= middle) {
        if (array[startI] > array[middle] || startI == middle) {
          while (endI > middle) {
            if ((startI == middle) && array[endI] < array[middle]) {
              tmp = array[endI];
              array[endI] = array[middle + 1]
              array[middle + 1] = array[middle]
              array[middle] = tmp;
              middle++
              startI++
              end++
              continue
            }
            if (array[endI] < array[middle] && array[startI] > array[middle]) {
              tmp = array[startI];
              array[startI] = array[endI];
              array[endI] = tmp;
              endI--;
              break
            }
            endI--
          }
          if (array[startI] > array[middle]) {
            tmp = array[startI];
            array[startI] = array[middle - 1]
            array[middle - 1] = array[middle]
            array[middle] = tmp;
            middle--
            continue
          }
        }
        startI++
      }
    }
    if (end - start < 3) return array;
    QuickSorter.quickSort(array, start, middle - 1)
    QuickSorter.quickSort(array, middle, end);
    return array
  }

  static quickSortOptimized(array: number[] = [], start = 0, end = array.length - 1) {
    let middle = start + Math.round((end - start) / 2);
    let startI = start;
    let endI = end;
    let tmp;
    while (startI <= endI) {
      while (startI <= middle) {
        if (array[startI] > array[middle] || startI == middle) {
          while (endI > middle) {
            if ((startI == middle) && array[endI] < array[middle]) {
              tmp = array[endI];
              array[endI] = array[middle + 1]
              array[middle + 1] = array[middle]
              array[middle] = tmp;
              middle++
              startI++
              end++
              continue
            }
            if (array[endI] < array[middle] && array[startI] > array[middle]) {
              tmp = array[startI];
              array[startI] = array[endI];
              array[endI] = tmp;
              endI--;
              break
            }
            endI--
          }
          if (array[startI] > array[middle]) {
            tmp = array[startI];
            array[startI] = array[middle - 1]
            array[middle - 1] = array[middle]
            array[middle] = tmp;
            middle--
            continue
          }
        }
        startI++
      }
    }
    if (end - start < 3) return array;
    // Avoid recursive call on small array (length == 2)
    if (start >= middle - 2) {
      let tmp;
      if (array[start] > array[middle - 1]) {
        tmp = array[start];
        array[start] = array[middle]
        array[middle] = tmp
      }
    } else
      QuickSorter.quickSortOptimized(array, start, middle - 1)
    // Avoid recursive call on small array (length == 2)
    if (middle >= end - 1) {
      let tmp;
      if (array[middle] > array[end]) {
        tmp = array[middle];
        array[middle] = array[end]
        array[end] = tmp
      }
    } else
      QuickSorter.quickSortOptimized(array, middle, end);
    return array
  }
}
