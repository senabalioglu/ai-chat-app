import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  messageBox: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 12,
    maxWidth: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 3,
    elevation: 3,
  },
  // diğer kullanıcının mesajı
  secondary: {
    alignSelf: "flex-start",
    backgroundColor: "aliceblue",
  },
  // kendi mesajın
  primary: {
    alignSelf: "flex-end",
    backgroundColor: "#313131",
    borderWidth: 1,
    borderColor: "#444444",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 12,
  },
  messageText: {
    fontSize: 18,
  },
  messageTextPrimary: {
    color: "aliceblue",
  },
  messageTextSecondary: {
    color: "#000",
  },
});

export default styles;