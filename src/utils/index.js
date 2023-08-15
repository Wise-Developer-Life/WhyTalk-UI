import asyncLocalStorage from './asyncLocalStorage'
import dayjs from 'dayjs'

const genQueryMap = arr => {
  /*
    input format: ['position=detail', 'skeletonData=true']
    output format: { position: 'detail',skeletonData: 'true' }
  */
  const map = {}

  if (!Array.isArray(arr)) return map

  arr?.forEach(item => {
    const [queryKey, queryVal] = item.split('=')
    if (queryKey && queryVal) {
      map[queryKey] = queryVal
    }
  })
  return map
}

const getUrlQueryMap = () => {
  const matchQueries = window.location.search.match(/([^?=&]+)(=([^&]*))?/g)
  return genQueryMap(matchQueries)
}

const dateFormatter = (year, month, date) => {
  const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }

  return `${MONTHS[month]} ${date}, ${year}`
}

const isoDateFormatter = isoString => {
  const dateInstance = new Date(isoString)

  return dayjs(dateInstance).format('YYYY-MM-DD')
}

function isOverflown(element, mode) {
  if (!element) return null
  switch (mode) {
    case 'vertical':
      return element.scrollHeight > element.clientHeight
    case 'horizontal':
      return element.scrollWidth > element.clientWidth
    default:
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      )
  }
}

export {
  genQueryMap,
  getUrlQueryMap,
  dateFormatter,
  isoDateFormatter,
  isOverflown,
  asyncLocalStorage,
}
