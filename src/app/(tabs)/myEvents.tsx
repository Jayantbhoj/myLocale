import AddEvent from "@/src/components/AddEvent";
import { Text, View, Button } from "react-native";
import { useAuth } from "@/src/context/AuthProvider";
import MyEventsScreen from "@/src/components/MyEventsScreen";

export default function Events({ navigation }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-Colors.white">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-Colors.white">
        <Text className="mb-4">You must be signed in to add events.</Text>
        <Button title="Go to Sign In" onPress={() => navigation.navigate("SignIn")} />
      </View>
    );
  }

  return (
      <MyEventsScreen/>
  );
}
