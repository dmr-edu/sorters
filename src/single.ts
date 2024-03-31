import { Sorter } from "./Sorter";

// Сортировка по младшему разряду
const sorter = new Sorter();

const sort = (arr) => {
  let d: any[] = [];
  let D: any[] = [];
  let max = arr[0];
  let length = String(max).length;
  arr[0] = String(arr[0])

  // Преобразовать к строке и найти большее число разрядов (самое длинную строку)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      arr[i] = String(arr[i]);
      length = arr[i].length;
      continue
    }
    arr[i] = String(arr[i]);
  }

  // Заполнить нулями недостающие разряды
  const zeros = '0'.repeat(length);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (zeros + arr[i]).slice(-length)
  }

  // цикл равный числу разрядов
  let j = 1;
  while (j <= length) {
    // цикл для каждой цифры 0-9
    for (let k = 0; k < 10; k++) {
      // Заполнить массив d числами, которые совпадают с цифрой k
      for (let g = 0; g < arr.length; g++) {
        if (arr[g][arr[g].length - j] != k) continue;
        d.push(arr[g]);
      }
      // добавить массив d в D
      D = [...D, ...d];
      d = [];
    }
    // Записать в arr результат шага while
    arr = [...D];
    D = []
    j++;
  }
  // Преобразовать обратно к числу
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i])
  }
  return arr;
};

console.log(sort([77, 33, 22, 19, 7, 15, 8, 4, 2, 6, 9, 5, 3, 2, 19, 56]));
// [2,  2,  3,  4,  5,  6, 7,  8,  9, 15, 19, 19, 22, 33, 56, 77]

const sort2 = (arr) => {
  let d: any[] = [];
  let D: any[] = [];
  let max = arr[0];
  let length = String(max).length;
  arr[0] = String(arr[0])

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      arr[i] = String(arr[i]);
      length = arr[i].length;
      continue
    }
    arr[i] = String(arr[i]);
  }

  let j = 1;
  while (j <= length) {
    for (let k = 0; k < 10; k++) {
      for (let g = 0; g < arr.length; g++) {
        // Доп проверка на длину числа и цифру k.
        // Если число короче количества разрядов и текущая цифра k равна 0, то присваиваем
        if (arr[g].length < j && k == 0) {
          d.push(arr[g]);
          continue;
        }
        if (arr[g][arr[g].length - j] != k) continue;
        d.push(arr[g]);
      }
      D = [...D, ...d];
      d = [];
    }
    arr = [...D];
    D = []
    j++;
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i])
  }
  return arr;
};

// console.log(sort([77, 33, 22, 19, 7, 15, 8, 4, 2, 6, 9, 5, 3, 2, 19, 56]));
// [2,  2,  3,  4,  5,  6, 7,  8,  9, 15, 19, 19, 22, 33, 56, 77]