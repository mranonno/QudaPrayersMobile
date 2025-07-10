import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import AppNavigator from "./src/navigation/AppNavigator";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
