import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LearnVideoScreen from "../screens/LearnVideoScreen";
import LearnTextBookScreen from "../screens/LearnTextBookScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  LearnVideo: undefined;
  LearnTextBook: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="LearnVideo"
        component={LearnVideoScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="LearnTextBook"
        component={LearnTextBookScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
