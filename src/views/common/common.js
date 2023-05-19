

export default {
  localStorage: window.localStorage,
  sessionStorage: window.sessionStorage,
  str: 'cw',
  getLocal(key) {
    return this.localStorage.getItem(key)
  },
  setLocal(key, value) {
    this.localStorage.setItem(key, value)
  },
  removeLocalStorage(key) {
    this.localStorage.removeItem(key)
    this.removeSessionStorage(key)
  },
  getSessionStorage(key) {
    return this.sessionStorage.getItem(key)
  },
  setSessionStorage(key, value) {
    this.sessionStorage.setItem(key, value)
  },
  removeSessionStorage(key) {
    this.sessionStorage.removeItem(key)
  },
  setOtherInfo(info, data) {
    this.setLocal(this.str + info, data)
    this.setSessionStorage(this.str + info, data)
  },
  getOtherInfo(info) {
    return (
      this.getLocal(this.str + info) ||
      this.getSessionStorage(this.str + info) ||
      'null'
    )
  },
  removeOtherInfo(info) {
    this.removeLocalStorage(this.str + info)
    this.removeSessionStorage(this.str + info)
  },
  // 10位时间戳格式化
  tenBitTimestamp(time) {
    const date = new Date(time * 1000)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second //组合
  },
  // 13位时间戳格式化
  thirteenBitTimestamp(time) {
    const date = new Date(time / 1)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second //组合
  },
  timeFn(time) {
    if (!time || time == 0) return false
    return
      time && time.toString().length == 10
        ? this.tenBitTimestamp(time)
        : this.thirteenBitTimestamp(time)
  },
  // 根据属性排序
  sortByKey(array, key) {
    let arr = JSON.parse(JSON.stringify(array))
    return arr.sort(function (a, b) {
      return parseInt(a[key]) - parseInt(b[key])
    })
  },
}
