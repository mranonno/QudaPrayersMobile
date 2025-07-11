import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { DrawerParamList } from "../navigation/DrawerNavigator"; // adjust the path
import IconButton from "./ui/IconButton";

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
  const styles = getStyles(colors);
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.innerContainer}>
        {showBackButton && (
          <IconButton
            onPress={() => navigation.goBack()}
            key={"backButton"}
            icon={<Ionicons name="arrow-back" size={22} color={colors.text} />}
          />
        )}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

        {showDrawerToggle && (
          <IconButton
            onPress={() => navigation.toggleDrawer()}
            key={"menuButton"}
            icon={<Ionicons name="menu" size={22} color={colors.text} />}
          />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 48,
      backgroundColor: colors.tabBackground,
      paddingHorizontal: 16,
      paddingBottom: 16,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
      marginHorizontal: 12,
    },
  });
