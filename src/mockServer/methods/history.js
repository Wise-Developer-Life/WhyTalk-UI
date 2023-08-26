import { faker } from '@faker-js/faker'
// import { Response } from 'miragejs'
// import { httpError, STATUS_CODES } from '../const.js'
import { base } from '../../api/config.js'

export function genHttpMethods() {
  const historyUrl = `${base}/api/v1/history-message`

  // methods
  // get user profile
  this.get(historyUrl, (schema, request) => {
    console.log('-query-', request.params)

    const { messageId, size = 30 } = request.params

    const res = []

    for (let i = 0; i < size; i++) {
      let obj = {}
      let people = ['viola', 'ellen']
      obj['message_id'] = faker.string.uuid()
      obj['sent_to_id'] = people[Math.round(Math.random())]
      obj['sent_from_id'] = people[Math.round(Math.random())]
      obj['content'] = faker.lorem.paragraph({ min: 1, max: 3 })
      obj['timestamp'] = faker.date.between({
        from: '2023-08-01T00:00:00.000Z',
        to: '2023-08-23T00:00:00.000Z',
      })
      res.push(obj)
    }

    return res
  })
}
