import { ArrayGenerator } from "./ArrayGenerator";

interface RunTestConfig {
  sorter: any,
  method: any,
  generateFunc: 'generateSortedArray' | 'generateSortedArrayWithmixedNumberOfValuePairs' | 'generateArr',
  times?: number,
  sizes?: number[],
  digitsMaxValues?: number[],
  mixedPairsCount?: number
}

export class Sorter {

  static stringify(arr, withZeros = false): [arr: string[], length: number] {
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
      // 100,
      // 5000,
      100000
    ],
    digitsMaxValues = [
      // 10,
      // 1000,
      // 10000,
      10000000
    ],
    mixedPairsCount = 3
  }: RunTestConfig) {

    const results: any = {};

    for (let j = 0; j < digitsMaxValues.length; j++) {
      const key = 'Array MAX value: ' + this.formatNumber(digitsMaxValues[j]);
      // @ts-ignore
      results[key] = {};
      for (let g = 0; g < sizes.length; g++) {
        const arrayLengthKey = 'Array size: ' + this.formatNumber(sizes[g])
        const array = ArrayGenerator[generateFunc](sizes[g], digitsMaxValues[j]);
        results[key][arrayLengthKey] = this.getAverageTime(sorter[method], times, array);
      }
    }

    return {
      'Class name': sorter.name,
      'Method name': method,
      [`Number of runs to determine the average execution time of the \"${method}\" method`]: times,
      'Results by arrays MAX values': results
    }
  }
}