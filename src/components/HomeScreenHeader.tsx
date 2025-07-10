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
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HamburgerIcon color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenHeader;

const getStyles = (colors: typeof import("../theme/lightColors").lightColors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      borderRadius: 12,
      elevation: 4,
    },
    logo: {
      width: 100,
      height: 40,
    },
  });
