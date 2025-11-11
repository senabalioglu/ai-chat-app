import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setCurrentUser }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nickname.trim()) {
      alert("Lütfen bir rumuz girin!");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/User/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nickname),
      });

      if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);

      const data = await res.json();
      console.log("Giriş yapan kullanıcı:", data);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(data));
      setCurrentUser(data);
      setIsLoggedIn(true);

      navigate("/");
    } catch (err) {
      console.error("Login hatası:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Enter nickname..."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}

export default Login;
