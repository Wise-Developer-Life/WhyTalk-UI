import RedirectMiddleware from './RedirectMiddleware.jsx'
import { MiddlewareHOC } from '../../components/HOC/index.jsx'

const RedirectProtector = MiddlewareHOC(RedirectMiddleware)

export { RedirectProtector }
