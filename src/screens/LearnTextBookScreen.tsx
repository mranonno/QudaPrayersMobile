import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";
import Accordion from "../components/ui/Accordion";
import { useThemeContext } from "../theme/ThemeProvider";

const LearnTextBookScreen = () => {
  const { colors, theme } = useThemeContext();
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView style={styles.accordionContainer}>
        <Accordion title="What is Qada Prayer?">
          <Text style={{ color: colors.text }}>
            Qada prayers are missed obligatory prayers that Muslims should make
            up.
          </Text>
        </Accordion>

        <Accordion title="How to perform Qada Prayer?">
          <Text style={{ color: colors.text }}>
            Same as regular salah but with intention of Qada.
          </Text>
        </Accordion>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearnTextBookScreen;

const styles = StyleSheet.create({
  accordionContainer: { paddingHorizontal: 16, marginTop: 16 },
});
