import { createContext, useContext } from 'react'

export const GlobalDataContext = createContext()
export const SocketIoContext = createContext()

export const useGlobalDataContext = () => useContext(GlobalDataContext)
export const useSocketIoContext = () => useContext(SocketIoContext)
