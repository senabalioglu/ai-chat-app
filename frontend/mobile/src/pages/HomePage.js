import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "react-native";

function Home (){
    return(
        <SafeAreaProvider>
            <View>
                <Text> Home </Text>
            </View>
        </SafeAreaProvider>
    )
}

export default Home;