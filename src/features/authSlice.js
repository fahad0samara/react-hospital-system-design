import { createSlice } from '@reduxjs/toolkit'

// Predefined test users
const testUsers = [
  {
    email: 'doctor@test.com',
    password: 'doctor123',
    userType: 'doctor',
    name: 'Dr. John Smith',
    specialty: 'Emergency Medicine'
  },
  {
    email: 'admin@test.com',
    password: 'admin123',
    userType: 'admin'
  }
]

const initialState = {
  user: { 
    email: 'doctor@test.com', 
    userType: 'doctor',
    name: 'Dr. John Smith',
    specialty: 'Emergency Medicine'
  },
  userType: 'doctor',
  isAuthenticated: true,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.userType = action.payload.userType
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure: (state, action) => {
      state.user = null
      state.userType = null
      state.isAuthenticated = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.userType = null
      state.isAuthenticated = false
      state.error = null
    },
    register: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    }
  }
})

export const { loginSuccess, loginFailure, logout, register } = authSlice.actions

// Thunk for handling login
export const login = (credentials) => (dispatch) => {
  const user = testUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  )

  if (user) {
    dispatch(loginSuccess(user))
  } else {
    dispatch(loginFailure('Invalid credentials'))
  }
}

export default authSlice.reducer
