const baseUrl = 'http://api-wise-developer-life'

const ENVS = {
  production: 'production',
  development: 'development',
}

const getBase = () => {
  const env = import.meta.env.MODE

  switch (env) {
    case ENVS.production: {
      // base url preprocess logic
      const regex = /^http:\/\//
      const browserBase = window.location.origin
      let matched = ''

      if (typeof browserBase === 'string') {
        matched = browserBase.replace(regex, '')
      }
      return `https://api-${matched}`
    }
    case ENVS.development:
    default:
      return baseUrl
  }
}
const base = getBase()

export { base }
