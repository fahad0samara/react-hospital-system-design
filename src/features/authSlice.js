import { createSlice } from '@reduxjs/toolkit'

// Predefined test users
const testUsers = [
  {
    email: 'doctor@test.com',
    password: 'doctor123',
    userType: 'doctor'
  },
  {
    email: 'patient@test.com',
    password: 'patient123',
    userType: 'patient'
  }
]

const initialState = {
  user: null,
  userType: null,
  isAuthenticated: false,
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
      testUsers.push(action.payload)
    }
  }
})

export const { loginSuccess, loginFailure, logout, register } = authSlice.actions

// Thunk for handling login
export const login = (credentials) => (dispatch) => {
  const user = testUsers.find(
    (user) =>
      user.email === credentials.email && user.password === credentials.password
  )

  if (user) {
    dispatch(loginSuccess(user))
  } else {
    dispatch(loginFailure('Invalid email or password'))
  }
}

export default authSlice.reducer
