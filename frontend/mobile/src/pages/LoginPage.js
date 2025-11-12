import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "react-native";

function Login (){
    return(
        <SafeAreaProvider>
            <View>
                <Text> Login </Text>
            </View>
        </SafeAreaProvider>
    )
}

export default Login;