export const DATA_STATE = {
  init: 'INIT',
  fetching: 'FETCHING',
  reload: 'RELOAD',
  ready: 'READY',
  failed: 'FAILED',
}

export const getInitialState = value => {
  return {
    state: DATA_STATE.init,
    value,
  }
}

export const apiDataReducer = (state, action) => {
  switch (action.type) {
    case DATA_STATE.fetching:
      return { state: DATA_STATE.fetching, value: state.value }
    case DATA_STATE.ready:
      return { state: DATA_STATE.ready, value: action.value }
    case DATA_STATE.reload:
      return { state: DATA_STATE.reload, value: state.value }
    case DATA_STATE.failed:
      return { state: DATA_STATE.failed, value: action.value || null }
    case DATA_STATE.init:
      return { state: DATA_STATE.init, value: [] }
    default:
      throw new Error('unknown action type')
  }
}
