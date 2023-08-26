import { createServer } from 'miragejs'
import { genHttpMethods as getLoginMethods } from './methods/user.js'
import { genHttpMethods as getHistoryMethods } from './methods/history'
import { base } from '../api/config.js'

export default function () {
  createServer({
    models: {
      // prediction: Model,
    },
    // seeds(server) {},
    routes() {
      // give api domain
      this.urlPrefix = base

      // login
      getLoginMethods.call(this)

      // history message
      getHistoryMethods.call(this)
    },
  })
}
