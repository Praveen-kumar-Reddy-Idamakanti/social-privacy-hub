import { useState, useEffect, createContext, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext(null);

// Custom Hook: useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

// Safe JSON Parse
const safeJSONParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return null; // Fallback if parsing fails
    }
  };
// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'));
  console.log('User data in localStorage:', localStorage.getItem('user'));

  // Load user data on component mount
  useEffect(() => {
    if (authToken) {
      const storedUser = safeJSONParse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      } else {
        console.error('Corrupted or empty user data');
        logout(); // Clear corrupted data
      }
    }
  }, [authToken]);

  // Login Function
  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    setAuthToken(null);

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


