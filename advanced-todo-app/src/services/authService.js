// Mock authentication service
export const login = async (credentials) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock validation - In a full stack project a backend call would have been here
    if (credentials.username === 'user' && credentials.password === 'password') {
      return { 
        success: true,
        user: { username: credentials.username } 
      };
    }
    
    return { 
      success: false,
      error: 'Invalid username or password' 
    };
  };
  
  export const logout = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  };
  
  // Check if user is authenticated (for continous sessions)
  export const checkAuth = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return {
      isAuthenticated,
      user: isAuthenticated ? { username: 'user' } : null
    };
  };