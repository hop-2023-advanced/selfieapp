import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text, Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Animated } from "react-native";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function UserScreen({ navigation }) {
  const { isLoaded, signOut } = useAuth();
  const [menu, setMenu] = useState(false);
  const { user } = useUser();
  //   console.log(user.imageUrl);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        // marginTop: 120,
        justifyContent: "space-between",
        backgroundColor: `${menu ? "rgba(255, 255, 255, 0.2)" : "white"}`,
        // backdropFilter: "blur(8px)",
        // height: "100%",
        // width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 50,
          // marginRight: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // borderBottomWidth: 0.17
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{user.fullName}</Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 20 }}
          onPress={() => setMenu(!menu)}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={`${menu ? "#f1f1f1" : "black"}`}
          />
        </TouchableOpacity>
        {menu ? (
          <View
            style={{
              position: "absolute",
              right: 20,
              top: 40,
              width: 110,
              height: 200,
              backgroundColor: "white",
              borderRadius: 10,
              borderTopRightRadius: 0,
              // borderWidth: 0.17,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMenu(!menu);
                navigation.navigate("Edit Profile");
              }}
              style={{
                height: 40,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "#F1F1F1",
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="black"
              />
              <Text>edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => signOut()}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ color: "red" }}>sign out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </View>
      <Image
        source={{ uri: user.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 75 }}
      />
      <View>
        <Text style={{ fontSize: 25 }}>{user.username}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="post"
          size={30}
          color="black"
          style={{ marginBottom: 10 }}
        />
        <View
          style={{ width: "100%", height: 400, borderTopWidth: 0.17 }}
        ></View>
      </View>
    </SafeAreaView>
  );
}
