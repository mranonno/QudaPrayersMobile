import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeContext } from "../theme/ThemeProvider";

const LearnVideoScreen = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>LearnVideoScreen</Text>
    </View>
  );
};

export default LearnVideoScreen;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
  });
