import HomeScreen from "../screens/HomeScreen";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import UserScreen from "../screens/UserScreen";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../screens/EditProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import EditProfileImageScreen from "../screens/EditProfileImageScreen";
import ImageItem from "./ImageItem";
const Stack = createStackNavigator();

const TabArr = [
  // HOME SCREEN
  {
    route: "Home",
    label: "Home",
    // type: Icon.MaterialCommunityIcons,
    activeicon: "home",
    inActiveicon: "home-outline",
    component: HomeScreen,
  },
  // CAMERA SCREEN
  {
    route: "Camera",
    label: "Camera",
    // type: Icon.MaterialCommunityIcons,
    activeicon: "camera",
    inActiveicon: "camera-outline",
    component: HomeScreen,
  },
  //PROFILE SCREEN
  {
    route: "Profile1",
    label: "Profile1",
    // type: Icon.MaterialCommunityIcons,
    activeicon: "account",
    inActiveicon: "account-outline",
    component: MyStack,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 1 },
        1: { scale: 1.5 },
      });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5 }, 1: { scale: 1 } });
    }
  }, [focused]);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
      }}
    >
      <Animatable.View
        ref={viewRef}
        duration={300}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <MaterialCommunityIcons
          name={focused ? item.activeicon : item.inActiveicon}
          color={focused ? "blue" : "black"}
          size={24}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile Image"
        component={EditProfileImageScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Image Item"
        component={ImageItem}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      }}
      tabBarPosition="bottom"
    >
      {TabArr.map((item, i) => {
        return (
          <Tab.Screen
            key={i}
            name={item.route}
            component={item.component}
            options={{
              title: (props) => {
                return (
                  <MaterialCommunityIcons
                    name={props.focused ? item.activeicon : item.inActiveicon}
                    color={props.focused ? "blue" : "black"}
                    size={30}
                  />
                );
              },
              tabBarIndicatorStyle: {
                display: "none",
              },
              // tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
