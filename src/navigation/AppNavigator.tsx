import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useThemeContext } from "../theme/ThemeProvider";
import DrawerNavigator from "./DrawerNavigator";
import { fonts } from "../components/constant/fonts";
const AppNavigator = () => {
  const { colors, theme } = useThemeContext();

  const navTheme = {
    dark: theme === "dark",
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
    fonts,
  };

  return (
    <NavigationContainer theme={navTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
