// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { login as authLogin, logout as authLogout, checkAuth } from '../../services/authService'

const initialState = {
  ...checkAuth(),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

// Export the plain action creators
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logoutSuccess, 
  clearError 
} = authSlice.actions

// Export async thunks
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const result = await authLogin(credentials)
    if (result.success) {
      dispatch(loginSuccess(result.user))
      localStorage.setItem('isAuthenticated', 'true')
      return true
    } else {
      dispatch(loginFailure(result.error))
      return false
    }
  } catch (error) {
    dispatch(loginFailure(error.message))
    return false
  }
}

export const logout = () => async (dispatch) => {
  try {
    await authLogout()
    dispatch(logoutSuccess())
    localStorage.removeItem('isAuthenticated')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

export default authSlice.reducer