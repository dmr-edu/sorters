export class ArrayGenerator {
  static getRandomInt = (max) => {
    let value = Math.floor(Math.random() * max);
    return value !== 0 ? value * (Math.random() > 0.5 ? 1 : -1) : value;
  }

  static generateRandomArray = (length, max) => {
    const arr: number[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(this.getRandomInt(max))
    }
    return arr;
  }

  static generateSortedArrayWithmixedNumberOfValuePairs(length, max, mixCount = 5) {
    const arr = this.generateSortedArray(length, max);
    for (let i = 0; i < mixCount; i++) {
      let startI = Math.abs(this.getRandomInt(arr.length - 1));
      let endI = startI;
      while (startI == endI) {
        endI = Math.abs(this.getRandomInt(arr.length - 1));
      }
      const tmp = arr[startI];
      arr[startI] = arr[endI];
      arr[endI] = tmp;
    }
    return arr;
  }

  static generateSortedArray(length, max) {
    const arr = this.generateRandomArray(length, max);
    return arr.sort((a, b) => a - b);
  }
}