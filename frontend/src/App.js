import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AuthProvider } from './components/Auth/AuthContext';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Logout from './components/Auth/Logout';
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';

function App() {
  const [route, setRoute] = useState('dashboard'); // 'login', 'signup', 'dashboard'

  return (
    <AuthProvider>
      <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <div style={{ padding: 24 }}>
            <nav style={{ marginBottom: 24 }}>
              <button onClick={() => setRoute('dashboard')}>Dashboard</button>
              <button onClick={() => setRoute('login')} style={{ marginLeft: 12 }}>Login</button>
              <button onClick={() => setRoute('signup')} style={{ marginLeft: 12 }}>Sign Up</button>
              <Logout />
            </nav>
            {route === 'login' && <Login />}
            {route === 'signup' && <SignUp />}
            {route === 'dashboard' && <Dashboard />}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
