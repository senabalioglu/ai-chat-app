import ChatInput from "../components/ChatInput/ChatInput";
import MessageBox from "../components/MessageBox/MessageBox";
import "../index.css";
import { useState, useEffect, useRef } from "react";

function Home({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      fetch(`${apiUrl}/Messages/all`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = document.querySelector(".container");
    const isAtBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 10;

    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (text) => {
    const newMessage = {
      userId: currentUser.id,
      text: text,
    };

    try {
      const res = await fetch(`${apiUrl}/Messages/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Mesaj gönderilemedi!");

      const savedMessage = await res.json();

      setMessages((prev) => [...prev, savedMessage]);
    } catch (err) {
      console.error("Gönderim hatası:", err);
    }
  };

  return (
    <div className="page-wrapper">
      <h1>Hoş geldin, {currentUser?.nickname} ✨</h1>
      <div className="container">
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            isOwnMessage={message.userId === currentUser.id}
            messageData={message}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Home;
