import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Auth/Login'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <>
                  <TaskInput />
                  <TaskList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App