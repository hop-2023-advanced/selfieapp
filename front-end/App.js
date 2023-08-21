import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import LoginFlow from "./loginflow/LoginFlow";
import HomeScreen from "./screens/HomeScreen";
import Root from "./loginflow/Root";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* CAMERA SCREEN HERE */}
      <Tab.Screen name="Take a Pic" component={HomeScreen} />
      {/* PROFILE SCREEN HERE  */}
      <Tab.Screen name="My Porfile" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  CLERK_PUBLISHABLE_KEY =
    "pk_test_YWNjZXB0ZWQtc2NvcnBpb24tOTIuY2xlcmsuYWNjb3VudHMuZGV2JA";
  return (
    <>
      <NavigationContainer>
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
