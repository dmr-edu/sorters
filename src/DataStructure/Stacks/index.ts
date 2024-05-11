import { Stack } from "./Stack";
const open = '(';
const close = ')';
const str = '(123(3434)())';

const checkString = (st): boolean => {
  const stack = new Stack<string>()
  for (let i = 0; i < st.length; i++) {
    const char = st[i];
    if (char === open) {
      stack.push(char)
    }
    if (char === close) {
      if (stack.isEmpty()) {
        stack.push(char)
        break
      }
      if (stack.peek() === open) {
        stack.pop()
      }
    }
  }

  return stack.isEmpty()
}

console.log(checkString(str))
