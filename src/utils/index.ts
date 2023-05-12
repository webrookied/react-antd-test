/**
 * @description: 防抖函数
 * 持续触发事件，在规定时间内未触发事件，事件处理函数才执行一次，在规定时间到来之前再次触发事件，删除计时器，重新计时
 * @param {*fn:执行函数 time:延时事件}
 * @return {*防抖函数}
 */
export const debounce = (function () {
  // 存储定时器
  let timer
  return (fn, time) => {
    //如果存在定时器进行清除
    if (timer) clearTimeout(timer)
    // 赋值定时器 并 执行函数
    timer = setTimeout(fn, time)
  }
})()

/**
 * @description:节流函数
 * 持续触发事件，在规定时间保证只执行一次事件处理函数
 * @param {*fun:执行函数,time:延时}
 * @return {*节流函数}
 */
export const throttle = (function () {
  // 定时器
  let timer
  return (fun, time = 500) => {
    // timer有值时不执行
    if (timer) return
    // 执行函数
    fun()
    // 赋值
    timer = setTimeout(() => {
      // 赋值为空
      timer = null
    }, time)
  }
})()
