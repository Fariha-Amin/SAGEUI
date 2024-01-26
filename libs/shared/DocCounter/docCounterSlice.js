import { createSlice } from '@reduxjs/toolkit'

export const docCounterSlice = createSlice({
    name: 'docCounter',
    initialState: {
        value: 2000,
    },
    reducers: {
        setCount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { setCount } = docCounterSlice.actions

export default docCounterSlice.reducer