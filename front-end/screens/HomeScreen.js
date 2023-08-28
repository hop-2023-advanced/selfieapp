import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import AvatarIcon from "../components/AvatarIcon";
import Post from "../components/Post";

export default function HomeScreen() {
  const windowWidth = Dimensions.get("screen").width;
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();

  //MOCKDATAS
  const USERS = [
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
    {
      image: user.imageUrl,
    },
  ];
  const POSTS = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      userId: 1,
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      username: "username",
      tag: ["tag1", "tag2"],
      title: "LONG TITLE HERE",
      date: "2023-8-25",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      userId: 1,
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      username: "username",
      tag: ["tag1", "tag2"],
      title: "LONG TITLE HERE",
      date: "2023-8-25",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      userId: 1,
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      username: "username",
      tag: ["tag1", "tag2"],
      title: "LONG TITLE HERE",
      date: "2023-8-25",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      userId: 1,
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      username: "username",
      tag: ["tag1", "tag2"],
      title: "LONG TITLE HERE",
      date: "2023-8-25",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      userId: 1,
      profilePicture: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
      username: "username",
      tag: ["tag1", "tag2"],
      title: "LONG TITLE HERE",
      date: "2023-8-25",
    },
  ];
  //ADD FRIEND
  USERS.push({
    image: "https://cdn-icons-png.flaticon.com/512/1053/1053155.png",
  });

  function viewProfile(item) {
    console.log(item.index);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, width: windowWidth }}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 15,
          }}
          data={USERS}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={(item) => (
            <TouchableOpacity onPress={() => viewProfile(item)}>
              <AvatarIcon image={item.item.image} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
        />
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          style={
            {
              // flex: 1,
            }
          }
          contentContainerStyle={{}}
          data={POSTS}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => <Post />}
          ItemSeparatorComponent={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}
