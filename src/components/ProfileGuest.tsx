import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/colors";

export default function ProfilePageGuest() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}> 

        <Text style={styles.title}>Welcome to myLocale</Text>
        <Text style={styles.subtitle}>
          Join now to explore events near you, save favorites, and manage your profile.
        </Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Join?</Text>
          <Text style={styles.sectionText}>• Get personalized event recommendations 🎉</Text>
          <Text style={styles.sectionText}>• Save your favorite events</Text>
          <Text style={styles.sectionText}>• Connect with the community</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <Text style={styles.sectionText}>Browse events without signing in</Text>
          <Text style={styles.sectionText}>Check out what's trending now</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    alignSelf: "stretch",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: Colors.grey,
    marginBottom: 4,
  },
});
