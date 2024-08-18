// src/service/AuthService.js

export const AuthService = {
    isAuthenticated: () => {
      const token = localStorage.getItem('token');
      return !!token;
    },
    
    getUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    hasRole: (role) => {
      const user = AuthService.getUser();
      return user && user.roles && user.roles.includes(role);
    },
  
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };
  