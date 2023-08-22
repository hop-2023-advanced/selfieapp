import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Homescreen from "./screens/HomeScreen";
import { PaperProvider } from "react-native-paper";
import { useState } from "react";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

export default function App() {
  CLERK_PUBLISHABLE_KEY =
    "pk_test_YWNjZXB0ZWQtc2NvcnBpb24tOTIuY2xlcmsuYWNjb3VudHMuZGV2JA";
  const [signed, setSigned] = useState(true);
  return (
    <PaperProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
          <Homescreen />
        </SignedIn>
        <SignedOut>
          {signed ? (
            <SignInScreen pressed={() => setSigned(false)} />
          ) : (
            <SignUpScreen pressed={() => setSigned(true)} />
          )}
        </SignedOut>
      </ClerkProvider>
    </PaperProvider>
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
