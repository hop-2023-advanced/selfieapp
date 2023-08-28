import React from "react";
import { AuthContext } from "./LoginFlow";
import SignInScreen from "../pages/SignInScreen";
import SignUpScreen from "../pages/SignUpScreen";

export default function Root() {
  const { isSignedUp, setIsSignedUp } = React.useContext(AuthContext);
  return isSignedUp ? <SignUpScreen /> : <SignInScreen />;
}

