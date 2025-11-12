import React, {useState} from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return isLoggedIn ? (
    <HomePage currentUser={currentUser} />
  ) : (
    <LoginPage
      onLoginSuccess={userData => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      }}
    />
  );
}
