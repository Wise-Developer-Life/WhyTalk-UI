import { createServer } from 'miragejs'
import { genHttpMethods as getLoginMethods } from './methods/user.js'
import { base } from '../api/config.js'
// import { faker } from '@faker-js/faker'

export default function () {
  createServer({
    models: {
      // prediction: Model,
      // trending: Model,
      // trendingIndicator: Model,
      // predictionId: Model,
    },
    // seeds(server) {},
    routes() {
      // give api domain
      this.urlPrefix = base

      // login
      getLoginMethods.call(this)
    },
  })
}
