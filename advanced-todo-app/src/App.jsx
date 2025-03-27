// src/App.jsx
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { logout } from './redux/slices/authSlice'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Login from './components/Auth/Login'
import PrivateRoute from './components/Auth/PrivateRoute'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Advanced To-Do App</h1>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-black">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-white text-primary-500 rounded text-sm hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="space-y-6">
                  <TaskInput />
                  <TaskList />
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Advanced To-Do App
        </div>
      </footer>
    </div>
  )
}

export default App