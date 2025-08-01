import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeContext } from "../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LearnQadaPrayers: React.FC = () => {
  const { colors } = useThemeContext();
  const styles = getStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Learn How To Perform Qada Prayers
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: colors.border }]}
          onPress={() => navigation.navigate("LearnVideo")}
        >
          <Ionicons name="logo-youtube" size={20} color="#FF0000" />
          <Text style={[styles.buttonText, { color: colors.text }]}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { borderColor: colors.border }]}
          onPress={() => navigation.navigate("LearnTextBook")}
        >
          <Ionicons name="book" size={20} color={colors.primary} />
          <Text style={[styles.buttonText, { color: colors.text }]}>
            Text Book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LearnQadaPrayers;

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      marginTop: 16,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    button: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
