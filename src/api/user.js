import { base } from './config.js'
import { TOKEN_NAME } from '../const.js'

export const fetchValidateAccount = async () => {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve({
        msg: 'validation done',
        value: true,
      })
    }, 1000)
  })
}

// ${base}/api/login
export const postLogin = formData => {
  return fetch(`${base}/api/v1/auth`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(formData),
  })
}

export const getUserProfile = () => {
  const token = JSON.parse(localStorage.getItem(TOKEN_NAME))

  return fetch(`${base}/api/v1/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
