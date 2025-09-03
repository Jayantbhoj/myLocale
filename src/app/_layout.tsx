import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import Colors from "@/src/constants/colors";
import SplashScreen from "../components/SplashScreen";
import { useState } from "react";
import { AuthProvider } from "../context/AuthProvider";

export default function Layout() {

  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" />
      </Stack>
    </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
