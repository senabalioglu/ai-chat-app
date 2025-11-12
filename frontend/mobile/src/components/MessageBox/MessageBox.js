import {
  View,
  Text,
} from 'react-native';
import styles from './MessaegeBox.styles';
import { compareAsc, parseISO, format } from 'date-fns';
import { tr } from 'date-fns/locale';

const MessaegeBox = ({messageData, isOwnMessage}) => {

  const cleanDate = parseISO(messageData.creationDate.split('.')[0]);
  const formattedTime = format(cleanDate, 'HH:mm', { locale: tr });

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
      <Text> {formattedTime} </Text>
    </View>
  );
};

export default MessaegeBox;
