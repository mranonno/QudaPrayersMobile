import "react-native-reanimated";
import React, { Suspense, lazy } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { GlobalProvider } from "./src/context/GlobalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

// Lazy load Main component to improve startup time
const Main = lazy(() => import("./src/_layout/Main"));

// Error Boundary to catch errors in component tree
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Optional: send error info to external logging service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <GlobalProvider>
            <BottomSheetModalProvider>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator size="large" color="#00aa39" />
                    </View>
                  }
                >
                  <Main />
                </Suspense>
              </ErrorBoundary>
            </BottomSheetModalProvider>
          </GlobalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
