import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import HamburgerIcon from "../../assets/icons/HamburgerIcon";
import { useThemeContext } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreenHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { colors } = useThemeContext();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContent}>
        <Image
          source={require("../../assets/logos/app-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => navigation.openDrawer()}
        >
          <HamburgerIcon color={colors.text} size={32} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenHeader;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
    },
    headerContent: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      minHeight: 56,
      borderRadius: 12,
      backgroundColor: colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 20,
      marginTop: 8,
    },
    logo: {
      width: 60,
      aspectRatio: 1.5,
      resizeMode: "contain",
    },
    hamburgerButton: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
