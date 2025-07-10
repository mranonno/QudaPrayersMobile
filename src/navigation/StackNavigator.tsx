import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import { DrawerParamList } from "./DrawerNavigator";
import { TouchableOpacity } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation
                  .getParent<DrawerNavigationProp<DrawerParamList>>() // ✅ cast parent to drawer type
                  ?.openDrawer()
              }
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
