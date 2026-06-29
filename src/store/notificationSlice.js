import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        show: false,
        message: '',
        variant: 'success',
    },
    reducers: {
        notify(state, action) {
            state.show = true
            state.message = action.payload.message
            state.variant = action.payload.variant ?? 'success'
        },
        hideNotification(state) {
            state.show = false
        },
    },
})

export const { notify, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
