import { useUser } from "@clerk/clerk-expo";
import { Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AvatarIcon(props) {
  return (
    <LinearGradient
      colors={[
        "rgba(238,174,202,1)",
        "rgba(148,187,233,1)",
        "rgba(241,44,130,0.6)",
      ]}
      style={{
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      locations={[0.1, 0.9, 1]}
      start={{ x: 0.7, y: 0.1 }}
    >
      <View
        style={{
          width: 85,
          height: 85,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
            borderRadius: "50%",
            borderWidth: 2,
            borderColor: "white",
          }}
        />
      </View>
    </LinearGradient>
  );
}
