import React from 'react'
import ReactDOM from 'react-dom/client'
import Entry from './components/Entry/index.jsx'
import { getUrlQueryMap } from './utils/index.js'

// lazy import
const getMockServerModule = import('./mockServer/index')

const initializeMockSever = async () => {
  return getMockServerModule
    .then(module => {
      // create mock api server instance
      console.log('activate mock server!')
      module.default()
    })
    .catch(error => {
      console.error('getMockServerModule error', error)
    })
}

;(async () => {
  const env = import.meta.env.MODE
  const urlQueryMap = getUrlQueryMap()

  /* query: mock=true, activate server */
  if (urlQueryMap?.['mock'] === 'true' && env === 'development') {
    try {
      console.log('wait for starting mock server...')
      await initializeMockSever()
    } catch (error) {
      console.error('initializeMockSever error:', error)
    }
  }

  // serve as index.js
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Entry />
    </React.StrictMode>
  )
})()
