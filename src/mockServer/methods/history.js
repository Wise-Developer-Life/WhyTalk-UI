import { faker } from '@faker-js/faker'
import { base } from '../../api/config.js'
// import { httpError, STATUS_CODES } from '../const.js'

export function genHttpMethods() {
  const historyUrl = `${base}/api/v1/history-message`

  // methods
  // get user profile
  this.get(historyUrl, (schema, request) => {
    const { messageId, size = 100 } = request.params

    const historyList = []

    for (let i = 0; i < size; i++) {
      let obj = {}
      const randomNum = Math.round(Math.random())

      let people = ['viola', 'ellen']
      obj['message_id'] = faker.string.uuid()
      obj['sent_to_id'] = people[randomNum]
      obj['sent_from_id'] = people[randomNum === 1 ? 0 : 1]
      obj['content'] = faker.lorem.paragraph({ min: 1, max: 3 })
      obj['timestamp'] = faker.date.between({
        from: '2023-08-01T00:00:00.000Z',
        to: '2023-08-23T00:00:00.000Z',
      })
      historyList.push(obj)
    }

    return historyList
  })
}
