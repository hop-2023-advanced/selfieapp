import { useState } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  navigation,
} from "react-native";

export default function ImageItem({ navigation, photo }) {
  const windowWidth = Dimensions.get("window").width;
  const imageSize = windowWidth * 0.33;
  const imageGap = windowWidth * 0.05;
  // console.log(photo.uri);

  return (
    <View
      style={{
        width: imageSize,
        height: imageSize,
        position: "relative",
      }}
    >
      <Image
        style={{
          width: imageSize,
          height: imageSize,
          backgroundColor: "#ccc",
        }}
        source={{ uri: photo.uri }}
        contentFit="cover"
      />  
    </View>
  );
}
