import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle 
} from "react-native-reanimated";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const circleScale = useSharedValue(0);

  useEffect(() => {
    circleScale.value = withTiming(6, { duration: 2500 }); // expand big enough to cover screen
    setTimeout(() => {
      onFinish();
    }, 2500);
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Expanding Pink Circle */}
      <Animated.View style={[styles.circle, circleStyle]} />

      {/* Logo & Tagline */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo/transparent.png")} // place your light logo in assets
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Connecting People Near You</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black, // start with white bg
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    top: -height * 0.25, // start from slightly above center top
    alignSelf: "center",
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: Colors.pink, // pink
  },
  logoContainer: {
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: 340,
    height: 340,
  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    marginTop: 12,
    fontWeight: "500",
  },
});
