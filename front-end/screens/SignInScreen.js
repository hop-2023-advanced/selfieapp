import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { PaperProvider, TextInput } from "react-native-paper";
import { AuthContext } from "../loginflow/LoginFlow";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setIsSignedUp } = React.useContext(AuthContext);
  const SignInUser = () => {
    setIsSignedUp(true);
  };

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
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            height: 300,
          }}
        >
          <Text style={{ fontSize: 30 }}>Нэвтрэх</Text>
          <View>
            <TextInput
              // autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              style={{
                width: 250,
                height: 40,
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: 5,
              }}
            />
          </View>

          <View>
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

          <TouchableOpacity onPress={onSignInPress}>
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
              <Text style={{ color: "white" }}>Нэвтрэх</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12 }}>
              Хэрэглэгч байхгүй бол энд дарна уу.
            </Text>
            <TouchableOpacity onPress={SignInUser}>
              <Text style={{ fontSize: 12, textDecorationLine: "underline" }}>
                Бүртгүүлэх
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}
