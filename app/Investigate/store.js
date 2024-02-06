import { configureStore } from '@reduxjs/toolkit'
import { docCounterSlice } from '../../libs/app/Investigate/Reducers/docCounterSlice'

export default configureStore({
    reducer: {
        docCounter: docCounterSlice.reducer
    },
})