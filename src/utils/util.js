/**
 * 简单实现防抖方法
 * @param fn 要防抖的函数
 * @param delay 防抖的毫秒数
 * @returns {Function}
 */
export function simpleDebounce(fn, delay = 100) {
  let timer = null;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}


// 简单的节流函数
export function throttle(func, wait, mustRun) {
  var timeout,
      startTime = new Date();

  return function() {
      var context = this,
          args = arguments,
          curTime = new Date();

      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if(curTime - startTime >= mustRun){
          func.apply(context,args);
          startTime = curTime;
      // 没达到触发间隔，重新设定定时器
      }else{
          timeout = setTimeout(func, wait);
      }
  };
};