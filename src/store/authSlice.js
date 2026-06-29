import { createSlice } from '@reduxjs/toolkit'

const savedAuth = (() => {
    try {
        const raw = localStorage.getItem('auth')
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
})()

const authSlice = createSlice({
    name: 'auth',
    initialState: savedAuth ?? {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload
            state.isLoggedIn = true
            localStorage.setItem('auth', JSON.stringify({ user: action.payload, isLoggedIn: true }))
        },
        logout(state) {
            state.user = null
            state.isLoggedIn = false
            localStorage.removeItem('auth')
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
