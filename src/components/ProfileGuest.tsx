import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Colors from "../constants/colors";
import { authService } from "@/src/services/authService";
import { useAuth } from "@/src/context/AuthProvider";
import { router } from "expo-router";

export default function ProfilePageGuest() {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await authService.signInWithEmail(email, password);
      if (user) {
        const profile = await authService.getProfile(user.id);
        setUser(profile); // ✅ instantly set context
        router.replace("/(tabs)"); // go to main app
      }
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header background */}
      <View style={styles.headerBackground} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo/transparent-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>
              Discover events, parties & more near you!
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.accountBox}>
          <Text style={styles.accountTitle}>Login</Text>
          <Text style={styles.accountSubtitle}>Login to RSVP</Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* You can still keep a SignUp button if needed */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { marginTop: 12, backgroundColor: Colors.black },
            ]}
            onPress={() => router.push("/(modals)/signUpModal")} // if you still want signup screen
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: Colors.pink,
  },
  safeArea: { backgroundColor: "transparent" },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
  tagline: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: -40,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  accountBox: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray,
    elevation: 2,
    transform: [{ translateY: -80 }],
  },
  loginButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: "center",
    width: "100%",
    maxWidth: 250,
    alignItems: "center",
    marginTop: 12,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.black,
  },
  accountSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
    textAlign: "left",
    width: "100%",
  },
  loginText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "100%",
  },
});
