import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LoginFlow from "./loginflow/LoginFlow";
import HomeScreen from "./pages/HomeScreen";
import Root from "./loginflow/Root";
import CameraScreen from "./pages/CameraScreen";

export default function App() {
  CLERK_PUBLISHABLE_KEY =
    "pk_test_YWNjZXB0ZWQtc2NvcnBpb24tOTIuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <LoginFlow>
        <SignedIn>
          <HomeScreen />
          {/* <SignOut /> */}
          <CameraScreen />
        </SignedIn>
        <SignedOut>
          <Root />
        </SignedOut>
      </LoginFlow>
    </ClerkProvider>
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
