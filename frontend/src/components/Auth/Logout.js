import React from 'react';
import { useAuth } from './AuthContext';

export default function Logout() {
  const { logout } = useAuth();
  return (
    <button onClick={logout} style={{ marginLeft: 12 }}>
      Logout
    </button>
  );
} 