import { useMemo } from 'react'
import { colorStyle, TonicProvider } from '@tonic-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteConfigs } from '../../routes/config.jsx'
import LoadingOverlay from '../LoadingOverlay/index.jsx'
import GlobalDataProvider from '../../contexts/providers/GlobalDataProvider.jsx'

const Entry = () => {
  const router = useMemo(() => {
    return createBrowserRouter(genRouteConfigs())
  }, [])

  return (
    <TonicProvider
      colorMode={{
        defaultValue: 'dark',
      }}
      colorStyle={{
        defaultValue: colorStyle,
      }}
      useCSSBaseline={true}
    >
      <GlobalDataProvider>
        <RouterProvider
          router={router}
          fallbackElement={<LoadingOverlay />}
        />
      </GlobalDataProvider>
    </TonicProvider>
  )
}

export default Entry
