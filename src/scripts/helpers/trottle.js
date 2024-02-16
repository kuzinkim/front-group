// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
const throttle = (callee, timeout) => {
    console.log('sdaws')
    let timer = null
  
    // Как результат возвращаем другую функцию.
    // Это нужно, чтобы мы могли не менять другие части кода, чуть позже мы увидим, как это помогает.
    return function perform(...args) {
      // Если таймер есть, то функция уже была вызвана, и значит новый вызов следует пропустить.
      if (timer) return
  
      // Если таймера нет, значит мы можем вызвать функцию:
      timer = setTimeout(() => {
        // Аргументы передаём неизменными в функцию-аргумент:
        callee(...args)
  
        // По окончании очищаем таймер:
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }
  
  // Применяем throttle():
  
  // function throttle(callee, timeout) {
  //   /* ... */
  // }
  
  // // Указываем, что нам нужно ждать 50 мс, прежде чем вызвать функцию заново:
  // const optimizedHandler = throttle(recalculateProgress, 50)
  
  // // Передаём новую throttled-функцию в addEventListener:
  // window.addEventListener('scroll', optimizedHandler)
  // window.addEventListener('resize', optimizedHandler)
  