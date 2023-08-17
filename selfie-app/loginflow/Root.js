import React from "react";
import { AuthContext } from "./LoginFlow";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

export default function Root() {
  const { isSignedUp, setIsSignedUp } = React.useContext(AuthContext);
  return isSignedUp ? <SignUpScreen /> : <SignInScreen />;
}
