import { configureStore } from '@reduxjs/toolkit'
import { docCounterSlice } from '../../libs/app/investigate/Reducers/docCounterSlice'

export default configureStore({
    reducer: {
        docCounter: docCounterSlice.reducer
    },
})