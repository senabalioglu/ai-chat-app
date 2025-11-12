import { SafeAreaView, View, Text, ScrollView, TextInput } from "react-native";
import styles from "./HomePage.styles";
import ChatInput from "../../components/ChatInput/ChatInput";
import { useEffect, useState } from "react";
import MessaegeBox from "../../components/MessageBox/MessageBox";

function HomePage ({currentUser}){
    const apiUrl = 'https://ai-chat-app-api.onrender.com/api';
    const [messages, setMessages] = useState([]);

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
    },[]);

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

    return(
        <SafeAreaView style={styles.main} >
            <View>
                <Text style={styles.title} > Hoş Geldin {currentUser.nickname} </Text>
            </View>
            <ScrollView style={styles.message_container} >
            {
                messages.map((message) => (
                    <MessaegeBox
                    key={message.id}
                    isOwnMessage={message.userId === currentUser.id}
                    messageData={message}
                    />
                ))
            }
            </ScrollView>
            <ChatInput onSend={handleSend} />
        </SafeAreaView>
    )
}

export default HomePage;