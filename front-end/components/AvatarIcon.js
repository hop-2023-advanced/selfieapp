import { useUser } from "@clerk/clerk-expo";
import { Image, View } from "react-native";

export default function AvatarIcon(props) {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        borderWidth: 1,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: props.image }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
        }}
      />
    </View>
  );
}
