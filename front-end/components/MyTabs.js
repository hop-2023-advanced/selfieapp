import HomeScreen from "../screens/HomeScreen";
import { Animated, View, Text, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";

const Tab = createBottomTabNavigator();

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
    route: "Profile",
    label: "Profile",
    // type: Icon.MaterialCommunityIcons,
    activeicon: "account",
    inActiveicon: "account-outline",
    component: HomeScreen,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
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

export default function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {TabArr.map((item, i) => {
        return (
          <Tab.Screen
            key={i}
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name={focused ? item.activeicon : item.inActiveicon}
                  color={color}
                  size={24}
                />
              ),
              tabBarButton: (props) => <TabButton {...props} item={item} />,
              tabBarStyle: {},
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
