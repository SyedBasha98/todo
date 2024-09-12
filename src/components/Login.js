import React, { useState } from 'react';

const Login = ({ onLogin, users, onSwitchToSignUp }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (typeof name !== 'string' || !name.trim()) {
      alert('Invalid username.');
      return;
    }

    const lowercasedName = name.trim().toLowerCase();  
    const user = users[lowercasedName]; 

    if (user && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', user.role);
      onLogin(true, user.role);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
