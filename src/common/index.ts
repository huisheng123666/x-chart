export function splitNum(num: number) {
  const numStr = num.toString()

  let times = 0
  let res = ''
  for (let i = numStr.length - 1; i >= 0; i--) {
    res = numStr[i] + res
    ++times
    if (times % 3 === 0 && times !== numStr.length) {
      res = ',' + res
    }
  }
  return res
}