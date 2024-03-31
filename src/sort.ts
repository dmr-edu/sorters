// Сортировка по младшему разряду

const sort = (arr) => {

};

// console.log(sort([77, 33, 22, 19, 7, 15, 8, 4, 2, 6, 9, 5, 3, 2, 19, 56]));
// [2,  2,  3,  4,  5,  6, 7,  8,  9, 15, 19, 19, 22, 33, 56, 77]




// 2 - ой Вариант решения задачи.В основном такой же как и первый, только не добавляются нули вместо недостающих разрадов, вместо этого добавлено еще одно условие на проверку k и длины числа

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





// ОТРИЦАТЕЛЬНЫЕ ЧИСЛА
// Пример сортировки по младшему разряду имеющему отрицательные числа
// Выполнен также как и предыдущий, только имеет доп. проверку на отрицательное число
// и добавляет массив отрицательных чисел в начало, а не в конец результирующего массива

const sort3 = (arr) => {
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

Output: [-46, -45, -5, -1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 15, 19, 19, 22, 33, 56, 77]



// Сортировка по старшему разряду (с положительными числами)

const radixSort = (arr, length, cur) => {
  if (cur == length || arr.length == 1 || !arr.length) return arr;
  const result = new Array(10).fill([]);
  let d = 0;
  while (d < 10) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][cur] == d) {
        result[d] = [...result[d], arr[i]]
      }
    }
    result[d] = radixSort(result[d], length, cur + 1)

    d++
  }

  return result.flat();
}

// Функция для нахождения максимального количества разрядов
// и преобразования элементов массива в строку
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
    arr[i] = (zeros + arr[i]).slice(-length)
  }
  return [arr, length]
}

// @ts-ignore
// console.log('Output: ', JSON.stringify(radixSort(...stringify([77, 33, 500, 22, 2, 1, 4, 7, 2, 19, 19, 56, 92, 72, 73, 93, 94, 28, 29, 20, 39, 99, 30]), 0)))
// Output:  ["001","002","002","004","007","019","019","020","022","028","029","030","033","039","056","072","073","077","092","093","094","099","500"]



// Сортировка по старшему разряду (с ОТРИЦАТЕЛЬНЫМИ ЧИСЛАМИ)

const radixSort2 = (arr, length, cur) => {
  if (cur == length || arr.length == 1 || !arr.length) return arr
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
    result[d] = radixSort(result[d], length, cur + 1)
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

const stringify2 = (arr) => {
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
// @ts-ignore
console.log('Output: ', JSON.stringify(radixSort(...stringify([77, 33, -34, -3, -1, -8, -777, 500, 22, 2, 1, 4, 7, 2, 19, 19, 56, 92, 72, 73, 93, 94, 28, 29, 20, 39, 99, 30]), 0)))
// Output:  [-777,-34,-8,-3,-1,1,2,2,4,7,19,19,20,22,28,29,30,33,39,56,72,73,77,92,93,94,99,500]