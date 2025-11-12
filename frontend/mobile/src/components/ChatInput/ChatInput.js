import { SafeAreaView, View, Text, ScrollView, TextInput, Button, TouchableOpacity} from "react-native";
import styles from "./ChatInput.styles";
import {useState} from "react";

const ChatInput = ({onSend}) => {

    const [text, setText] = useState("");

    const handlePress = () => {
      if(!text.trim()) return;
      onSend(text);
      setText("");
    }

    return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type..."
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress} >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChatInput;