import { configureStore } from '@reduxjs/toolkit'
import { basketReducer, favsReducer, fetchReducer, userReducer } from './slices'

export const makeStore = () => {
  // console.log(initialStates);
  // console.log(basketReducer);
  return configureStore({
    reducer: {
        userData: userReducer,
        basketData: basketReducer,
        fetchSlice: fetchReducer,
        favsData: favsReducer
    },
    // preloadedState: {
    //   basketData: initialStates
    // },
    middleware: gdm => gdm()
  })
}