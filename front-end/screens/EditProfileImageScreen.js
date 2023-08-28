import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Animated } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { ClerkLoading } from "@clerk/clerk-expo";
import ImageItem from "../components/ImageItem";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function EditProfileImageScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);

  const windowWidth = Dimensions.get("window").width;
  const imageGap = windowWidth * 0.05;
  async function ViewMedia() {
    const result = await MediaLibrary.getAssetsAsync({
      first: 50,
    });
    setPhotos(result.assets);
  }

  useEffect(() => {
    ViewMedia();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: imageGap,
        position: "relative",
      }}
    >
      <FlatList
        style={{
          gap: imageGap,
        }}
        data={photos}
        numColumns={3}
        keyExtractor={(item) => item.uri}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Edit Profile",{photo: item});
            }}
          >
            <ImageItem photo={item} contentFit="cover" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
