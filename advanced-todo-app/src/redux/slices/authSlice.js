import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

// Action creators
export const { loginSuccess, logoutSuccess, setLoading, setError } = authSlice.actions

// Thunk actions
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    // Mock authentication
    if (credentials.username === 'user' && credentials.password === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      dispatch(loginSuccess({ username: credentials.username }))
      return true
    }
    dispatch(setError('Invalid credentials'))
    return false
  } catch (error) {
    dispatch(setError(error.message))
    return false
  } finally {
    dispatch(setLoading(false))
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem('isAuthenticated')
  dispatch(logoutSuccess())
}

export default authSlice.reducer