import AddEvent from "@/src/components/AddEvent";
import { Text, View, Button, StyleSheet } from "react-native";
import { useAuth } from "@/src/context/AuthProvider";
import MyEventsScreen from "@/src/components/MyEventsScreen";
import Colors from "@/src/constants/colors";

export default function Events({ navigation }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>You must be signed in to add events.</Text>
        <Button
          title="Go to Sign In"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MyEventsScreen />

      <View style={styles.fab}>
        <AddEvent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  message: {
    marginBottom: 16,
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 10,
    elevation: 5, 
  },
});
