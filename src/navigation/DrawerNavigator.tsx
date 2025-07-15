// src/navigation/DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ThemeSettingScreen from "../screens/ThemeSettingScreen";
import StackNavigator from "./StackNavigator";
import CustomHeader from "../components/CustomHeader";
import { useThemeContext } from "../theme/ThemeProvider";

// Type safety for navigation
export type DrawerParamList = {
  HomeStack: undefined;
  ThemeSettings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  const { colors } = useThemeContext();

  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerPosition: "right",
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontSize: 16 },
        drawerStyle: {
          width: 300,
          backgroundColor: colors.card,
        },
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ThemeSettings"
        component={ThemeSettingScreen}
        options={{
          title: "Theme Settings",
          headerShown: true,
          header: () => (
            <CustomHeader
              title="Theme Settings"
              showBackButton
              showDrawerToggle
            />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="color-palette-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
