import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import { useThemeContext } from "../theme/ThemeProvider";

const AppNavigator = () => {
  const { colors } = useThemeContext();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
