import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ThemeSettingScreen from "../screens/ThemeSettingScreen";
import StackNavigator from "./StackNavigator";
import { Pressable } from "react-native";

export type DrawerParamList = {
  HomeStack: undefined;
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
        drawerStyle: {
          width: 300,
        },
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
        options={({ navigation }) => ({
          title: "Theme Settings",
          headerShown: true,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="color-palette-outline" color={color} size={size} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
