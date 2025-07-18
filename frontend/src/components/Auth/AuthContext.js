import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { user_id, token }

  useEffect(() => {
    // Load from localStorage on mount
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (token && user_id) {
      setUser({ user_id, token });
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_id', data.user_id);
    setUser({ user_id: data.user_id, token: data.access_token });
  };

  const signup = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Signup failed');
    const data = await res.json();
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user_id', data.user_id);
    setUser({ user_id: data.user_id, token: data.access_token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 