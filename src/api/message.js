import { base } from './config.js'
import { TOKEN_NAME } from '../const.js'

export const getHistoryMessages = ({ queries = {} }) => {
  const token = JSON.parse(localStorage.getItem(TOKEN_NAME))

  const urlObj = new URL(`${base}/api/v1/history-message`)

  for (const [key, value] of Object.entries(queries)) {
    urlObj.searchParams.set(key, value)
  }

  return fetch(urlObj, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
