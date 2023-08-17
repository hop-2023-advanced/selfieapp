import { useAuth } from "@clerk/clerk-expo";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { isLoaded, signOut } = useAuth();

  return (
    <SafeAreaView>
      <View>
        {isLoaded ? (
          <View>
            <TouchableOpacity
              title="sign out"
              onPress={() => {
                signOut();
              }}
            >
              <Text>sign out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </View>
      <Text>sdfsfs</Text>
    </SafeAreaView>
  );
}
