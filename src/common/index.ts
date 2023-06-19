export function splitNum(num: number) {
  if (num === undefined) return ''
  const numStr = num.toString()
  const last = numStr.split('.')[1] || ''
  const isFu = numStr.indexOf('-') === 0

  let times = 0
  let res = ''
  let prev = numStr.split('.')[0]
  if (isFu) {
    prev = prev.slice(1)
  }
  for (let i = prev.length - 1; i >= 0; i--) {
    res = prev[i] + res
    ++times
    if (times % 3 === 0 && times !== prev.length) {
      res = ',' + res
    }
  }
  res = last ? res + `.${last}` : res
  return isFu ? '-' + res : res
}


export const formatNum = (num = 0) => {
  return num.toString().replace(/\d+/, function(n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  });
}
