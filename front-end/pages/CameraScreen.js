import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [lastPhoto, setLastPhoto] = useState("");
  const [permissionResponse, request] = MediaLibrary.usePermissions();
  const [delay, setDelay] = useState(5);
  const [pressed, setPressed] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    getPhotos();
  }, [lastPhoto]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!permissionResponse) {
    return <View />;
  }

  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={request}>
            <Text>sent request</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!granted && !canAskAgain) {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity>
            <Text>sent request</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function getPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
    });
    setLastPhoto(media.assets[0]);
  }

  async function takePicture() {
    if (pressed === false) {
      setPressed(true);
      setTimeout(async () => {
        const { uri } = await cameraRef.current.takePictureAsync();
        await MediaLibrary.saveToLibraryAsync(uri);
        setPressed(false);
      }, 5000);
      setInterval(() => {
        setDelay((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return 5;
          }
        });
      }, 1000);
    }
  }
  console.log(pressed);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      </View>
      <View style={styles.libraryContainer}>
        <Pressable style={styles.librarySection}>
          <Image style={styles.image} source={{ uri: lastPhoto.uri }} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            takePicture();
          }}
        >
          <View style={styles.buttonBorder}>
            <View style={styles.buttonBody}></View>
          </View>
        </Pressable>
        <Pressable style={styles.librarySection} onPress={toggleCameraType}>
          <MaterialIcons name="switch-camera" size={40} color="grey" />
        </Pressable>
      </View>
      <View>
        <Text>{delay}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { height: "100%", width: "100%" },
  container: {
    width: 200,
    height: 200,
    justifyContent: "center",
  },
  libraryContainer: {
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
  },
  librarySection: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBorder: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: "grey",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 50, height: 50, borderRadius: 10 },
  buttonBody: {
    width: 65,
    height: 65,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  camera: {
    flex: 1,
  },
});
