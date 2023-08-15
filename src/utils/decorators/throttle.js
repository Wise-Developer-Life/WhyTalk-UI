export default function throttle(func, ms) {
  let isThrottled = false
  let savedArgs
  let savedThis

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments
      savedThis = this
      return
    }
    isThrottled = true

    // console.log('-arguments0-', arguments[0])
    func.apply(this, arguments)

    setTimeout(function () {
      isThrottled = false
      // execute the last cached movement:

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = null
        savedThis = null
      }
    }, ms)
  }

  return wrapper
}
