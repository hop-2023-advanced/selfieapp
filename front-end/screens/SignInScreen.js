import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Button, TextInput } from "react-native-paper";

export default function SignInScreen({ pressed }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUserName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          height: 300,
        }}
      >
        <Text style={{ fontSize: 30 }}>Log In</Text>

        <TextInput
          mode="outlined"
          value={emailAddress}
          label="Email or username"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
          onPress={onSignInPress}
          mode="contained"
          style={{
            width: 250,
            height: 40,
          }}
        >
          Log In
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => pressed()}>
            <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
