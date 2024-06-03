'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './redux/store'
import { basketInitiate } from './redux/slices'

export const StoreProvider = ({ children }) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}