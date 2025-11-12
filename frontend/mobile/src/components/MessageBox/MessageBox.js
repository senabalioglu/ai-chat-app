import {
  View,
  Text,
} from 'react-native';
import styles from './MessaegeBox.styles';

const MessaegeBox = ({messageData, isOwnMessage}) => {
  return (
    <View
      style={[
        styles.messageBox,
        isOwnMessage ? styles.primary : styles.secondary,
      ]}>
      <Text
        style={[
          styles.messageText,
          isOwnMessage ? styles.messageTextPrimary : styles.messageTextSecondary,
        ]}>
        {' '}
        {messageData.text}{' '}
      </Text>
      <Text> {messageData.sentiment} </Text>
    </View>
  );
};

export default MessaegeBox;
