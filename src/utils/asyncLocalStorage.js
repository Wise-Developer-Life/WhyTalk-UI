const asyncLocalStorage = {
  setItem(key, value) {
    return Promise.resolve().then(() => {
      return localStorage.setItem(key, value)
    })
  },
  getItem(key) {
    return Promise.resolve().then(() => {
      return localStorage.getItem(key)
    })
  },
  removeItem(key) {
    // return Promise.resolve().then(() => {
    //   return localStorage.removeItem(key)
    // })
    return new Promise(resolve => {
      // simulate delay
      setTimeout(() => {
        resolve()
      }, 2000)
    }).then(() => {
      return localStorage.removeItem(key)
    })
  },
}

export default asyncLocalStorage
