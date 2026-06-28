import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://6a4029779b6d371e83818937.mockapi.io/orchids'

export const fetchOrchids = createAsyncThunk('orchids/fetchAll', async () => {
    const { data } = await axios.get(API_URL)
    return data
})

export const addOrchid = createAsyncThunk('orchids/add', async (orchid) => {
    const { data } = await axios.post(API_URL, orchid)
    return data
})

export const updateOrchid = createAsyncThunk('orchids/update', async ({ id, orchid }) => {
    const { data } = await axios.put(`${API_URL}/${id}`, orchid)
    return data
})

export const deleteOrchid = createAsyncThunk('orchids/delete', async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
})

const orchidSlice = createSlice({
    name: 'orchids',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrchids.pending,   (state) => { state.status = 'loading' })
            .addCase(fetchOrchids.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchOrchids.rejected,  (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addOrchid.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(updateOrchid.fulfilled, (state, action) => {
                const idx = state.list.findIndex(o => o.id === action.payload.id)
                if (idx !== -1) state.list[idx] = action.payload
            })
            .addCase(deleteOrchid.fulfilled, (state, action) => {
                state.list = state.list.filter(o => o.id !== action.payload)
            })
    },
})

export default orchidSlice.reducer
