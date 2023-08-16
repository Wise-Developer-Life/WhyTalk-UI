import { ROUTES_CONFIG } from './const.js'
import { LayoutWrapper } from '../components/HOC/index.jsx'
import LoadingOverlay from '../components/LoadingOverlay/index.jsx'
import RootRouter from '../modules/RootRouter/index.jsx'
import { RedirectProtector } from './middlewares'

export const genRouteConfigs = () => {
  const LoadingOverlayFallback = LayoutWrapper(LoadingOverlay)

  return [
    {
      path: ROUTES_CONFIG.ROOT.route,
      // element: <RootRouter />,
      element: RedirectProtector(RootRouter),
    },
    {
      path: '*',
      element: RedirectProtector(LoadingOverlayFallback, { isOpen: true }),
    },
  ]
}
