
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');
    
    if (token && expirationTime) {
      const now = new Date().getTime();
      if (now < expirationTime) {
        return true; // Token is still valid
      } else {
        logout(); // Token expired, clear it
      }
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('coins');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/login'; // Redirect to login page
  };