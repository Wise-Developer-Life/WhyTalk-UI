import { DATA_STATE } from '../../../reducers/index.js'

// todo: it's hard-code inside
export const handleHistoryRequest = async props => {
  const { setter, queries, fetcher, cachedRef } = props

  try {
    let successRes
    const res = await fetcher({ queries })

    switch (res.status) {
      case 200: {
        successRes = await res.json()

        successRes.histories = [...successRes.histories, ...cachedRef.current]
        cachedRef.current = successRes.histories

        setter({
          state: DATA_STATE.ready,
          hasPrev: successRes.hasPrev,
          value: successRes.histories,
        })
        break
      }
      case 404:
      case 400:
      case 500:
      default: {
        setter({
          state: DATA_STATE.failed,
          hasPrev: false,
          value: res.statusText,
        })
        break
      }
    }
  } catch (error) {
    console.error(error)
  }
}
