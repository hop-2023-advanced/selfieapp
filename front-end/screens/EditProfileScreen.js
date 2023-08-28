import { ClerkLoading, useUser } from "@clerk/clerk-expo";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function EditProfileScreen(props) {
  // console.log(props.route.params);
  const { user } = useUser();
  const [permissionResponse, requestResponsePermission] =
    MediaLibrary.usePermissions();

  const [image, setImage] = useState(user.imageUrl);
  const [userName, setUserName] = useState(user.username);
  const [firstname, setFirstName] = useState(user.firstName);
  const [lastname, setLastName] = useState(user.lastName);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const updateUser = async () => {
    await user.update({
      username: userName,
      first_name: firstname,
      last_name: lastname,
    });
    // await user.setProfileImage({
    //   file: "ph%3A%2F%2F1AD8FB98-18F7-435A-A2C7-AB8740B2A736",
    // });
    // console.log(image);
    props.navigation.navigate("Profile");
  };
  useEffect(() => {
    if (props.route.params !== undefined) {
      setImage(props.route.params.photo.uri);
    }
  }, [props.route.params]);

  const askingPermission = () => {
    if (!permissionResponse) {
      return <View />;
    }
    if (!permissionResponse.granted) {
      return (
        <View>
          <Text>We need your permission to show the camera</Text>
          <Button
            onPress={requestResponsePermission}
            title="grant permission"
          />
        </View>
      );
    } else {
      props.navigation.navigate("Edit Profile Image");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.2,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>Edit Profile</Text>
        <TouchableOpacity onPress={updateUser}>
          <Text style={{ color: "blue", fontWeight: "600", fontSize: 16 }}>
            Done{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            width: "100%",
            height: 150,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderBottomWidth: 0.17,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 75 }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 97,
              left: 206,
              width: 30,
              height: 30,
              // borderWidth: 1,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f1f1f1",
            }}
            onPress={askingPermission}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Text>Username :</Text>
            <TextInput
              value={userName}
              style={{
                borderBottomWidth: 0.2,
                height: 50,
                width: 200,
                marginLeft: 30,
              }}
              onChangeText={setUserName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Text>Firstname :</Text>
            <TextInput
              style={{
                borderBottomWidth: 0.2,
                height: 50,
                width: 200,
                marginLeft: 30,
              }}
              value={firstname}
              onChangeText={setFirstName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginLeft: 30,
            }}
          >
            <Text>Lastname :</Text>
            <TextInput
              style={{
                borderBottomWidth: 0.2,
                height: 50,
                width: 200,
                marginLeft: 30,
              }}
              value={lastname}
              onChangeText={setLastName}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
