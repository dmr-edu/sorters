export const getAverageTime = (func = () => { }, times = 20): number => {
  let time = 0;
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    func();
    time += performance.now() - start;
  }
  return time / times
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max) * (Math.random() > 0.5 ? 1 : -1);
}

export const generateArr = (length, max) => {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(getRandomInt(max))
  }
  return arr;
}

