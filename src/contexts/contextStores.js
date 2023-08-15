import { createContext, useContext } from 'react'

export const GlobalDataContext = createContext()

export const useGlobalDataContext = () => useContext(GlobalDataContext)
