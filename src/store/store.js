import { configureStore } from '@reduxjs/toolkit'
import orchidReducer from './orchidSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        orchids: orchidReducer,
        auth: authReducer,
    },
})
