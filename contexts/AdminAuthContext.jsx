'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // Simple admin credentials (in production, this should be handled server-side)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // In production, use proper authentication
  };

  useEffect(() => {
    // Check if admin is already logged in (localStorage)
    const adminToken = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_user');
    
    if (adminToken && adminData) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(adminData));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Simple credential check (in production, this would be an API call)
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const adminData = {
          id: 'admin-1',
          username: 'admin',
          name: 'Administrator',
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        // Store in localStorage (in production, use secure tokens)
        localStorage.setItem('admin_token', 'admin-token-' + Date.now());
        localStorage.setItem('admin_user', JSON.stringify(adminData));
        
        setIsAuthenticated(true);
        setAdminUser(adminData);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    adminUser,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
