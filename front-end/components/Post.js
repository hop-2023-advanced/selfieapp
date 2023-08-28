import { Dimensions, Image, Text, View } from "react-native";

export default function Post() {
  const windowWidth = Dimensions.get("screen").width;
  return (
    <View
      style={{
        width: windowWidth,
        height: 300,
        // backgroundColor: "blue",
        borderWidth: 1,
        padding: 15,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "green",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          // paddingHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: null }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            borderColor: "white",
            borderWidth: 2,
          }}
        />
        <Image
          source={{ uri: null }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            borderColor: "white",
            borderWidth: 2,
          }}
        />

        {/* <View style={{ flexDirection: "row", backgroundColor: "red" }}> */}
        <Text>My Nickname</Text>
        <Text>X</Text>
        <Text>My Friends</Text>
        {/* </View> */}
      </View>
      <Image
        source={{
          uri: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
        }}
        style={{ flex: 4, backgroundColor: "black" }}
      />
    </View>
  );
}
