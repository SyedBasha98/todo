import React, { useState, useEffect } from 'react'; 
import Login from './components/Login';
import SignUp from './components/SignUp '
import TodoApp from './components/Todo/Todo';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState({});


  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"; 
    const role = localStorage.getItem("role");
    const savedUsers = JSON.parse(localStorage.getItem("users")) || {}; 
    setIsLoggedIn(loggedIn); 
    setUserRole(role);
    setUsers(savedUsers);
  }, []);

  const handleLogin = (loggedIn, role) => {
    localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false"); 
    localStorage.setItem("role", role);
    setIsLoggedIn(loggedIn); 
    setUserRole(role);
  };


  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); 
    localStorage.removeItem("role"); 
    setIsLoggedIn(false); 
    setUserRole(null); 
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
  };


  const handleSignUp = (username, password, role) => {
    if (typeof username !== 'string' || !username.trim()) {
      alert('Invalid username.');
      return;
    }

    const lowercasedUsername = username.trim().toLowerCase();
    if (users[lowercasedUsername]) { 
      alert('Username already exists. Please choose another.');
      return;
    }
    const updatedUsers = { ...users, [lowercasedUsername]: { password, role } }; 
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    handleSwitchToLogin();
  };

  return (
    <div>
      {!isLoggedIn ? (
        showSignUp ? (
          <SignUp onSignUp={handleSignUp} onSwitchToLogin={handleSwitchToLogin} />
        ) : (
          <Login onLogin={handleLogin} users={users} onSwitchToSignUp={handleSwitchToSignUp} />
        )
      ) : (
        <TodoApp onLogout={handleLogout} isAdmin={userRole === "admin"} />
      )}
    </div>
  );
};

export default App;
