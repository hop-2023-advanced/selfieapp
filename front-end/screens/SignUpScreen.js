import * as React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Button, PaperProvider, TextInput } from "react-native-paper";
import { useState } from "react";

export default function SignUpScreen({ pressed }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

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
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {!pendingVerification && (
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: 300,
          }}
        >
          <Text style={{ fontSize: 30 }}>Sign Up</Text>

          <TextInput
            mode="outlined"
            value={emailAddress}
            label="Email"
            onChangeText={(email) => setEmailAddress(email)}
            style={{
              width: 250,
              height: 40,
              backgroundColor: "white",
              fontSize: 13,
            }}
          />

          <TextInput
            mode="outlined"
            value={password}
            label="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={(password) => setPassword(password)}
            style={{
              width: 250,
              height: 40,
              backgroundColor: "white",
              fontSize: 13,
            }}
            right={
              <TextInput.Icon
                style={{ marginTop: 15 }}
                icon="eye"
                onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
                }}
              />
            }
          />

          <Button
            onPress={onSignUpPress}
            mode="contained"
            style={{
              width: 250,
              height: 40,
            }}
          >
            Sign Up
          </Button>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12 }}>Have an account? </Text>
            <TouchableOpacity onPress={() => pressed()}>
              <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View
          style={{
            rowGap: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <TextInput
              value={code}
              mode="outlined"
              style={{ width: 300 }}
              label="Code"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button mode="contained" onPress={onPressVerify}>
            Verify Email
          </Button>
          <Button
            mode="contained"
            onPress={() => setPendingVerification(false)}
            style={{ position: "absolute", top: 0, left: -20 }}
          >
            Back
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
