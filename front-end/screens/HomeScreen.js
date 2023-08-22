import { useAuth, useUser } from "@clerk/clerk-expo";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const { isLoaded, signOut } = useAuth();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {isLoaded ? (
        <Button
          mode="contained"
          onPress={() => {
            signOut();
          }}
          style={{ width: 150 }}
        >
          sign out
        </Button>
      ) : (
        ""
      )}
    </SafeAreaView>
  );
}
