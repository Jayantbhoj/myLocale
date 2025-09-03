import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { authService } from "@/src/services/authService";
import Colors from "@/src/constants/colors";
import { useAuth } from "@/src/context/AuthProvider";

export default function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length >= 6;

  const handleSignup = async () => {
    try {
      const profile = await authService.signUpWithEmail(email, password, firstName, lastName);
      setUser( profile )
      onSuccess?.(); // close modal if provided
      router.replace("/");
    } catch (err: any) {
      console.error("signup failed:", err.message);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to RSVP and explore events</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={Colors.gray}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={Colors.gray}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.gray}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.gray}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.signupButton, !isValid && styles.signupButtonDisabled]}
        disabled={!isValid}
        onPress={handleSignup}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "600", color: Colors.black },
  subtitle: { fontSize: 14, color: Colors.gray, marginTop: 8, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    color: Colors.black,
  },
  signupButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  signupButtonDisabled: { backgroundColor: Colors.gray },
  signupText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
});
