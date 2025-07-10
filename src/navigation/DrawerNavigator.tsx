import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ThemeSettingScreen from "../screens/ThemeSettingScreen";
import StackNavigator from "./StackNavigator"; // import stack navigator

export type DrawerParamList = {
  HomeStack: undefined; // wrapping Home and Details in a stack
  ThemeSettings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#0a9396",
        drawerLabelStyle: { fontSize: 16 },
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="ThemeSettings"
        component={ThemeSettingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="color-palette-outline" color={color} size={size} />
          ),
          title: "Theme Settings",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
