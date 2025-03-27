import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-white shadow-md py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
     
        <div className="w-1/4"></div>
        
        <div className="text-center w-2/4">
          <Link to="/" className="text-xl font-bold text-blue-600">
            To-Do App
          </Link>
        </div>
        
        <div className="flex items-center justify-end w-1/4 gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600 font-sans hidden md:block">
                Hello There, {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 border border-red-200 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar