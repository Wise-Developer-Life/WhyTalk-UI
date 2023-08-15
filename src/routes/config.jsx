import { ROUTES_CONFIG } from './const.js'
import { LayoutWrapper } from '../components/HOC/index.jsx'
import LoadingOverlay from '../components/LoadingOverlay/index.jsx'
import RootRouter from '../modules/RootRouter/index.jsx'

export const genRouteConfigs = () => {
  const LoadingOverlayFallback = LayoutWrapper(LoadingOverlay)

  return [
    {
      path: ROUTES_CONFIG.ROOT.route,
      element: <RootRouter />,
    },
    {
      path: '*',
      element: <LoadingOverlayFallback isOpen />,
    },
  ]
}
