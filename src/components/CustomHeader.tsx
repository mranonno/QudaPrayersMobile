import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/DrawerNavigator"; // adjust the path

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  showDrawerToggle?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = false,
  showDrawerToggle = false,
}) => {
  const { colors } = useThemeContext();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: colors.tabBackground }]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.innerContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
        )}

        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

        {showDrawerToggle && (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Ionicons name="menu" size={22} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 12,
  },
});
