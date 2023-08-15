import debounce from './decorators/debounce.js'

let lastScrollLeft = 0
let lastScrollTop = 0
let timerX = null
let timerY = null

export default function handleScrollbar(
  event,
  func,
  container,
  cssScrollX,
  cssScrollY
) {
  if (!container) return func

  const containerWebkitScrollbar = this.getComputedStyle(
    container,
    '::-webkit-scrollbar'
  )

  const deltaX = container.scrollLeft - lastScrollLeft
  const deltaY = container.scrollTop - lastScrollTop

  if (deltaY === 0 && deltaX === 0) return

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    clearTimeout(timerX)
    // console.log('scroll x', container.scrollLeft, lastScrollLeft)

    // onscroll x
    container.style.setProperty(cssScrollX, 'inline')
    container.style.setProperty(cssScrollY, 'none')

    // console.log('-boxWebkitScrollbar-', containerWebkitScrollbar.display)

    timerX = setTimeout(() => {
      container.style.setProperty(cssScrollX, 'none')
    }, 500)

    // /* record time is the last scroll event entering time */
    // lastScrollLeft = container.scrollLeft

    // used to record last position after cooldown time
    debounce(() => {
      lastScrollLeft = container.scrollLeft
    }, 500)()
  } else {
    clearTimeout(timerY)
    // console.log('scroll y', container.scrollTop, lastScrollTop)

    // onscroll y
    container.style.setProperty(cssScrollY, 'inline')
    container.style.setProperty(cssScrollX, 'none')

    timerY = setTimeout(() => {
      container.style.setProperty(cssScrollY, 'none')
    }, 400)

    debounce(() => {
      lastScrollTop = container.scrollTop
    }, 400)()
  }

  if (func) func.call(this, event)
}
