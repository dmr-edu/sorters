import { Sorter } from "./Sorter";

export class RadixSorter extends Sorter {
  static sortByLowerOrder(array) {
    let posD: any = [];
    let tmp: any = [];
    let negD: any = [];
    let D: any[] = [];
    let [arr, length] = Sorter.stringify(array, false);
    // цикл равный числу разрядов
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
          // @ts-ignore
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
      // @ts-ignore
      arr[i] = parseInt(arr[i])
    }
    return arr;
  }


  static sortByOlderOrder(array, len = undefined, cur = 0) {
    if (cur == len || array.length == 1 || !array.length) return array;
    let arr = array;
    let length: any = len
    if (cur == 0) {
      let [arrStr, lenStr] = Sorter.stringify(array, true);
      arr = arrStr;
      length = lenStr
    }
    let result = new Array(10).fill([]);
    let d = 0;
    while (d < 10) {
      for (let i = 0; i < arr.length; i++) {
        const isNeg = arr[i].startsWith('-');
        let tmpVal = isNeg ? (arr[i]).replace('-', '') : arr[i];
        if (tmpVal[cur] == d) {
          result[d] = [...result[d], arr[i]]
        }
      }
      result[d] = RadixSorter.sortByOlderOrder(result[d], length, cur + 1)
      d++
    }

    result = result.flat();
    if (cur !== 0) return result;
    // Перед завершением работы функции (если завершается первый вызов функции
    // и все рекурсивные вызовы уже завершины), то преобразуем к числу
    // и при переборе с конца массива выносим отрицательные в начало,
    // положительные в конец, тем самым сортируя отрицательные числа,
    // так как они отсортированы по возрастанию (в положительном виде)
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
}