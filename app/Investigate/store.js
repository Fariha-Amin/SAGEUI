import { configureStore } from '@reduxjs/toolkit'
import { docCounterSlice } from '../../libs/shared/DocCounter/docCounterSlice'

export default configureStore({
    reducer: {
        docCounter: docCounterSlice.reducer
    },
})