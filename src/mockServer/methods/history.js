import { faker } from '@faker-js/faker'
import { base } from '../../api/config.js'
// import { httpError, STATUS_CODES } from '../const.js'

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function genHttpMethods() {
  const historyUrl = `${base}/api/v1/history-message`

  // methods
  // get user profile
  let fetchCount = 0
  this.get(
    historyUrl,
    (schema, request) => {
      const { messageId, size = 100 } = request.queryParams

      const historyList = []
      let now = Date.now()
      const interval = 1000 * 60 * 17
      const largeInterval = 1000 * 60 * 60 * 24

      for (let i = 1; i <= size; i++) {
        let obj = {}
        const randomNum = Math.round(Math.random())
        const timeNoise = Math.round(Math.random() * 15000)

        let people = ['viola', 'ellen']
        obj['message_id'] = faker.string.uuid()
        obj['sent_to_id'] = people[randomNum]
        obj['sent_from_id'] = people[randomNum === 1 ? 0 : 1]
        obj['content'] = `${fetchCount + 1}-${i}: ${faker.lorem.paragraph({
          min: 1,
          max: 3,
        })}`
        obj['timestamp'] = new Date(
          now - largeInterval * fetchCount + interval * i + timeNoise
        ).toISOString()

        historyList.push(obj)
      }

      fetchCount += 1

      return {
        hasPrev: fetchCount < 5,
        histories: historyList,
      }
    },
    { timing: randomRange(0, 1500) }
  )
}
