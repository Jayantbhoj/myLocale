import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  Easing 
} from "react-native-reanimated";
import Colors from "../constants/colors";

const { width } = Dimensions.get("window");

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const circleScale = useSharedValue(0);
  const logoScale = useSharedValue(1);
  const logoOpacity = useSharedValue(1);

  useEffect(() => {
    // Expanding circle animation
    circleScale.value = withTiming(6, { duration: 2500, easing: Easing.out(Easing.ease) });

    // Fade + shrink logo as splash ends
    setTimeout(() => {
      logoScale.value = withTiming(0.7, { duration: 850, easing: Easing.inOut(Easing.ease) });
      logoOpacity.value = withTiming(0, { duration: 850, easing: Easing.inOut(Easing.ease) });
    }, 1800);

    // Navigate after splash
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Expanding Pink Circle */}
      <Animated.View style={[styles.circle, circleStyle]} />

      {/* Logo (static, then fade + shrink) */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("../assets/logo/transparent.png")}
          style={[styles.logo, logoStyle]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    top: -width,
    left: width / 2 - width,
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: Colors.pink,
  },
  logoContainer: {
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: 600,
    height: 600,
  },
});
