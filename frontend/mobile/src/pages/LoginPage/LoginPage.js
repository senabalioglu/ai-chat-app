import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './LoginPage.styles';

export default function LoginPage({onLoginSuccess}) {
  const apiUrl = 'https://ai-chat-app-api.onrender.com/api';
  const [nickname, setNickname] = useState('');

  const handleLogin = async () => {
    if (nickname.trim() === '') {
      alert('Lütfen rumuz girin!');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/User/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nickname),
      });

      if (!res.ok) throw new Error(`Sunucu hatası: ${res.status}`);

      const data = await res.json();
      console.log('Giriş yapan kullanıcı:', data);

      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('currentUser', JSON.stringify(data));

      onLoginSuccess(data);
    } catch (err) {
      console.error('Login hatası:', err);
    }
  };

  return (
    <View style={styles.main} >
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
        style={{
          width: 200,
          padding: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          marginVertical: 10,
        }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
