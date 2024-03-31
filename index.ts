// Пример сортировки по младшему разряду имеющему отрицательные числа
// Выполнен также как и предыдущий, только имеет доп. проверку на отрицательное число
// и добавляет массив отрицательных чисел в начало, а не в конец результирующего массива

import { getAverageTime, generateArr } from "./helpers";

const sort = (arr) => {
  let posD: any = [];
  let tmp: any = [];
  let negD: any = [];
  let D: any = [];
  let max = arr[0];
  let length = String(max).length;
  arr[0] = String(arr[0])

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      arr[i] = String(arr[i]);
      length = (arr[i]).length;
      continue
    }
    arr[i] = String(arr[i]);
  }

  let j = 1;
  while (j <= length) {
    for (let k = 0; k < 10; k++) {
      for (let g = 0; g < arr.length; g++) {
        const isNeg = arr[g].startsWith('-');
        // Если число отрицательное, то пишем в массив для отрицательных чисел,
        // иначе в массив для положительных
        tmp = isNeg ? negD : posD;
        // Временное значение приведенное к положительному числу
        // (остается в виде строки, просто убирается "-" в начале)
        let tmpVal = isNeg ? (arr[g]).replace('-', '') : arr[g];
        // Доп проверка на длину числа и цифру k.
        // Если число короче количества разрядов и текущая цифра k равна 0, то присваиваем
        if (tmpVal.length < j && k == 0) {
          tmp.push(arr[g]);
          continue;
        }
        if (tmpVal[tmpVal.length - j] != k) continue;
        tmp.push(arr[g]);
      }
      // Разворачиваем массив отрицательных чисел в начало массива D,
      // положительных - в конец массива D
      D = [...negD, ...D, ...posD];
      posD = [];
      negD = [];
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

// console.log('Output: ', JSON.stringify(sort([77, -5, -1, -45, -46, 33, 22, 19, 7, 15, 8, 4, 2, 6, 9, 5, 3, 2, 19, 56])));
let counter = 0
const radixSort = (arr, length, cur) => {
  if (cur == length || arr.length == 1 || !arr.length) return arr
  let result = new Array(10).fill([]);
  let d = 0;
  while (d < 10) {
    for (let i = 0; i < arr.length; i++) {
      const isNeg = arr[i].startsWith('-');
      let tmpVal = isNeg ? (arr[i]).replace('-', '') : arr[i];
      if (tmpVal[cur] == d) {
        counter++;
        result[d] = [...result[d], arr[i]]
      }
    }
    result[d] = radixSort(result[d], length, cur + 1)
    d++
  }

  // @ts-ignore
  result = result.flat();
  if (cur !== 0) return result;

  const final = [...result];
  let negI = 0;
  let posI = result.length - 1;
  for (let i = result.length - 1; i >= 0; i--) {
    const int = parseInt(result[i]);
    if (int < 0) {
      final[negI] = int;
      negI++;
      continue;
    }
    final[posI] = int;
    posI--
  }

  return final;
}

const stringify = (arr) => {
  let max = arr[0];
  let length = String(max).length;
  arr[0] = String(arr[0])

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      arr[i] = String(arr[i]);
      length = (arr[i]).length;
      continue
    }
    arr[i] = String(arr[i]);
  }
  // Заполнить нулями недостающие разряды
  const zeros = '0'.repeat(length);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (arr[i] > 0 ? '' : '-') + (zeros + Math.abs(arr[i])).slice(-length)
  }
  return [arr, length]
}
let arr = [77, 33, 34, -3, -1, -8, -777, 500, 22, 2, 1, 4, 7, 2, 19, 19, 56, 92, 72, 73, 93, 94, 28, 29, 20, 39, 99, 30];
arr = arr.concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr).concat(arr);

const generatedArr = generateArr(1000, 9999999);
console.log({ generatedArr })
console.time('start#########r');
// @ts-ignore
const result = radixSort(...stringify(arr), 0)
console.timeEnd('start#########r')

console.log('eVARAGE ', getAverageTime(() => {
  // @ts-ignore
  radixSort(...stringify(arr), 0)
}, 10))
console.log(counter, result.length)
console.log('Output: ', JSON.stringify(result))

