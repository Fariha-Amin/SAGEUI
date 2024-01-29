import { configureStore } from '@reduxjs/toolkit'
import { docCounterSlice } from '../../libs/shared/doc-counter/docCounterSlice'

export default configureStore({
    reducer: {
        docCounter: docCounterSlice.reducer
    },
})