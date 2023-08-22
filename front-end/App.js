import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LoginFlow from "./loginflow/LoginFlow";
import Root from "./loginflow/Root";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import MyTabs from "./components/MyTabs";

export default function App() {
  CLERK_PUBLISHABLE_KEY =
    "pk_test_YWNjZXB0ZWQtc2NvcnBpb24tOTIuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
    <>
      <NavigationContainer>
        <PaperProvider>
          <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            <LoginFlow>
              <SignedIn>
                <MyTabs />
              </SignedIn>
              <SignedOut>
                <Root />
              </SignedOut>
            </LoginFlow>
          </ClerkProvider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
