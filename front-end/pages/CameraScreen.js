import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
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

configureAbly({
  key: "Lx-5NA.VcfrwA:E8rcMjUru_pIyAg6nFpGYv5MbvSDx-eP_N8DPGXs6Zo",
  clientId: Date.now() + "",
});

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [flash, setflash] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [lastPhoto, setLastPhoto] = useState("");
  const [permissionResponse, request] = MediaLibrary.usePermissions();
  const [delay, setDelay] = useState(5);
  const [pressed, setPressed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const cameraRef = useRef();

  const [startChannel] = useChannel("start", (startNotification) => {
    setIsStarted(startNotification.data.started);
  });

  useEffect(() => {
    getPhotos();
  }, [lastPhoto]);

  useEffect(() => {
    if (isStarted) takePicture();
  }, [isStarted]);

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
  // async function sendMessage() {
  //   selfieChannel.publish("private-selfie", { lastPhoto, date: Date.now() });
  // }
  async function sendStart() {
    startChannel.publish("start", { started: true });
  }

  if (!permissionResponse) {
    return <View />;
  }

  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    return (
      <SafeAreaView>
        <View style={{ margin: 100 }}>
          <TouchableOpacity onPress={request}>
            <Text>sent request a</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!granted && !canAskAgain) {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={request}>
            <Text> sent request</Text>
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

  function toggleFlash() {
    setflash(!flash);
  }

  async function getPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
    });
    setLastPhoto(media.assets[0]);
  }

  async function takePicture() {
    setTimeout(async () => {
      setPressed(false);
      const { uri } = await cameraRef.current.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      clearInterval(start);
      setDelay(5);
      sendMessage();
      startChannel.publish("start", { started: false });
    }, 5000);

    let start = setInterval(() => {
      setDelay((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 5;
        }
      });
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.flashContainer}>
          <Pressable style={styles.flashSection}>
            <Ionicons
              name={flash ? "flash" : "flash-outline"}
              size={15}
              color="grey"
              onPress={toggleFlash}
            />
          </Pressable>
        </View>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash ? "on" : "off"}
        ></Camera>
      </View>
      <View style={styles.libraryContainer}>
        <Pressable style={styles.librarySection}>
          <Image style={styles.image} source={{ uri: lastPhoto.uri }} />
        </Pressable>
        <Pressable
          disabled={pressed}
          style={styles.button}
          onPress={() => {
            setPressed(true);
            sendStart();
          }}
        >
          <View style={styles.buttonBorder}>
            <View style={styles.buttonBody}></View>
          </View>
        </Pressable>
        <Pressable style={styles.librarySection} onPress={toggleCameraType}>
          <MaterialCommunityIcons
            name="rotate-3d-variant"
            size={35}
            color="grey"
          />
        </Pressable>
      </View>
      <View style={styles.countDown}>
        <Text style={styles.countDownText}>{isStarted ? delay : ""}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { height: "100%", width: "100%" },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
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
  flashSection: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "grey",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  librarySection: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  flashContainer: { width: "90%", height: 30 },
  buttonBorder: {
    width: 70,
    height: 70,
    borderWidth: 5,
    borderColor: "grey",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 50, height: 50, borderRadius: 10 },
  buttonBody: {
    width: 55,
    height: 55,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  camera: {
    height: "70%",
    width: "90%",
  },
  countDown: {
    position: "absolute",
    alignSelf: "center",
    top: "20%",
  },
  countDownText: {
    fontSize: 200,
    color: "white",
    fontWeight: "700",
  },
});
