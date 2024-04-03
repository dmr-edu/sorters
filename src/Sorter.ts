import { ArrayGenerator } from "./ArrayGenerator";

interface RunTestConfig {
  sorter: any,
  method: any,
  generateFunc: 'generateSortedArray' | 'generateSortedArrayWithmixedNumberOfValuePairs' | 'generateRandomArray',
  times?: number,
  sizes?: number[],
  digitsMaxValues?: number[],
}

export class Sorter {

  static stringify(arr, withZeros = false): [string[], number] {
    let max = arr[0];
    let length = String(max).length;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        arr[i] = String(arr[i]);
        length = (arr[i]).length;
        continue
      }
      arr[i] = String(arr[i]);
    }
    // Заполнить нулями недостающие разряды
    if (withZeros) {
      const zeros = '0'.repeat(length);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = (zeros + arr[i]).slice(-length)
      }
    }
    return [arr, length]
  }

  static getAverageTime = (method, times = 20, ...params): string => {
    let time = 0;
    for (let i = 0; i < times; i++) {
      const start = Date.now();
      method(...params);
      time += Date.now() - start;
    }
    return (time / times).toFixed(5)
  }

  static formatNumber(num: number): any {
    return Intl.NumberFormat().format(num)
  }

  static runTest({
    sorter,
    method,
    generateFunc,
    times = 20,
    sizes = [
      1000000
    ],
    digitsMaxValues = [
      10000000
    ]
  }: RunTestConfig) {

    const results: any = {};

    for (let j = 0; j < digitsMaxValues.length; j++) {
      const key = 'Максимальное число в массиве: ' + this.formatNumber(digitsMaxValues[j]);
      results[key] = {};
      for (let g = 0; g < sizes.length; g++) {
        const arrayLengthKey = 'Длина массива: ' + this.formatNumber(sizes[g])
        const array = ArrayGenerator[generateFunc](sizes[g], digitsMaxValues[j]);
        results[key][arrayLengthKey] = this.getAverageTime(sorter[method], times, array);
      }
    }

    return {
      'Класс сортировки': sorter.name,
      'Метод сортировки': method,
      'Функция генерации массива': generateFunc,
      'Количество повторений для расчета среднего времени выполнения функции': times,
      'Результаты по максимальным значениям': results
    }
  }

  static runTestGroup({ sortMethods, ...config }: Omit<RunTestConfig, 'method' | 'generateFunc'> & { sortMethods: string[] }) {
    const generateFuncs: Parameters<typeof Sorter.runTest>[0]['generateFunc'][] = ['generateSortedArray', 'generateSortedArrayWithmixedNumberOfValuePairs', 'generateRandomArray'];
    const start = performance.now();
    let hasRepeated = false;
    for (let s = 0; s < sortMethods.length; s++) {
      for (let i = 0; i < generateFuncs.length; i++) {
        const conf = {
          method: sortMethods[s],
          generateFunc: generateFuncs[i],
          ...config
        }
        if (!hasRepeated) {
          hasRepeated = true;
          // Для первой итерации прогнать тест 2 раза для исключения искажения результатов.
          Sorter.runTest(conf)
          Sorter.runTest(conf)
        }
        console.log(JSON.stringify(Sorter.runTest(conf), null, 4))
      }
    }

    console.log('Звершено за: ', (performance.now() - start).toFixed(2), ' ms')
  }
}