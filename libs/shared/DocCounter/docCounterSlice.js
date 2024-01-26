import { createSlice } from '@reduxjs/toolkit'

export const docCounterSlice = createSlice({
    name: 'docCounter',
    initialState: {
        value: 0,
    },
    reducers: {
        setCount: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setCount } = docCounterSlice.actions

export default docCounterSlice.reducer