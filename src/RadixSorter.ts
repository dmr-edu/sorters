import { Sorter } from "./Sorter";

export class RadixSorter extends Sorter {
  static sortByLowerOrder(array) {
    let d: any[] = [];
    let D: any[] = [];
    const [arr, length] = Sorter.stringify(array, false);
    // цикл равный числу разрядов
    let j = 1;
    while (j <= length) {
      // цикл для каждой цифры 0-9
      for (let k = 0; k < 10; k++) {
        // Заполнить массив d числами, которые совпадают с цифрой k
        for (let g = 0; g < arr.length; g++) {
          if (+arr[g][arr[g].length - j] != k) continue;
          d.push(arr[g]);
        }
        // добавить массив d в D
        D = [...D, ...d];
        d = [];
      }
      // Записать в arr результат шага while
      array = [...D];
      D = []
      j++;
    }
    // Преобразовать обратно к числу
    for (let i = 0; i < arr.length; i++) {
      array[i] = parseInt(arr[i])
    }
    return array;
  }
}