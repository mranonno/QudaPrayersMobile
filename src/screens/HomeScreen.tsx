import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  DrawerNavigationProp,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

type DrawerParamList = {
  Home: undefined;
  // other screens...
};

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>

      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 24,
  },
});
