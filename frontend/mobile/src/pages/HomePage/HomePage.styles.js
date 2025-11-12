import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1e1e1e',
    height: '100%',
    margin: 0,
  },
  title: {
    color: 'aliceblue',
    fontWeight: 'bold',
    fontSize: 30
  },
  message_container: {
    backgroundColor: '#3a3a3a',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    minHeight: 700
  }
});

export default styles;