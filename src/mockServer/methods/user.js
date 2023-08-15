import { Response } from 'miragejs'
import { httpError, STATUS_CODES } from '../const.js'
import { base } from '../../api/config.js'

export function genHttpMethods() {
  const loginUrl = `${base}/api/v1/auth`
  const userProfileUrl = `${base}/api/v1/user`

  const fakeJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  // methods
  this.post(
    loginUrl,
    (schema, request) => {
      const payload = JSON.parse(request.requestBody)

      if (
        payload.username === 'viola-chen' &&
        payload.password === '54775477'
      ) {
        return { token: fakeJwt }
      }
      return new Response(
        401,
        { prop: 'header' },
        httpError[STATUS_CODES.unauthorized]
      )
    },
    { timing: 500 }
  )

  // get user profile
  this.get(userProfileUrl, () => {
    return { name: 'test-in-mockserver' }
  })
}
