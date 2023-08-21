import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import SignInScreen from "./SignInScreen";
import { useState } from "react";
import { AuthContext } from "../loginflow/LoginFlow";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const { setIsSignedUp } = React.useContext(AuthContext);
  const SignUpUser = () => {
    setIsSignedUp(false);
  };

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!pendingVerification && (
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              height: 300,
            }}
          >
            <Text style={{ fontSize: 30 }}>Бүртгүүлэх</Text>
            <View>
              <TextInput
                // autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={password}
                placeholder="Password..."
                secureTextEntry={secureTextEntry}
                onChangeText={(password) => setPassword(password)}
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setSecureTextEntry(!secureTextEntry);
                    }}
                  />
                }
              />
            </View>

            <TouchableOpacity onPress={onSignUpPress}>
              <View
                style={{
                  backgroundColor: "green",
                  width: 250,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Бүртгүүлэх</Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12 }}>
                Хэрэглэгч байгаа бол энд дарна уу.
              </Text>
              <TouchableOpacity onPress={SignUpUser}>
                <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
                  Нэвтрэх
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {pendingVerification && (
          <View>
            <View>
              <TextInput
                value={code}
                placeholder="Code..."
                onChangeText={(code) => setCode(code)}
              />
            </View>
            <TouchableOpacity onPress={onPressVerify}>
              <Text>Verify Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PaperProvider>
  );
}
