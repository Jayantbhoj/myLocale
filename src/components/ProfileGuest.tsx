import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/colors";
import { useState } from "react";
import LoginModal from "../app/(modals)/loginModal";

export default function ProfilePageGuest() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header background */}
      <View style={styles.headerBackground} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header Content */}
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Center Logo */}
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo/transparent-logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.tagline}>Discover events, parties & more near you!</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.accountBox}>
          <Text style={styles.accountTitle}>Account</Text>
          <Text style={styles.accountSubtitle}>
            Login/Create account to RSVP
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <LoginModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
  // inside styles
body: { 
  flex: 1, 
  justifyContent: "center", 
  alignItems: "center",
  paddingHorizontal: 20, // instead of marginTop hack
},

accountBox: {
  width: "100%",
  maxWidth: 400, // keeps it neat on wide devices
  padding: 16,
  borderRadius: 12,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.grey,
  elevation: 2,
  transform: [{ translateY: -80 }], 
},

loginButton: {
  backgroundColor: Colors.pink,
  paddingVertical: 12,
  borderRadius: 8,
  alignSelf: "center",
  width: "100%",        // full width
  maxWidth: 250,        // cap width for large screens
  alignItems: "center", // center text
},

  accountTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.black,
  },
  accountSubtitle: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 16,
    textAlign: "left", // force left alignment
    width: "100%", 
  },

  loginText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
