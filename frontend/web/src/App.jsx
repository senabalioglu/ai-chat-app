import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("currentUser");

    if (storedLogin === "true" && storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home currentUser={currentUser} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
  );
}
