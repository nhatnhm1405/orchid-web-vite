import { configureStore } from '@reduxjs/toolkit'
import orchidReducer from './orchidSlice'
import authReducer from './authSlice'
import notificationReducer from './notificationSlice'

export const store = configureStore({
    reducer: {
        orchids: orchidReducer,
        auth: authReducer,
        notification: notificationReducer,
    },
})
