import { configureStore } from '@reduxjs/toolkit'
import patientReducer from '../features/patientSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    patients: patientReducer,
    auth: authReducer,
  },
})
