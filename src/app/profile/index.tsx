import { View, ActivityIndicator } from "react-native";
import ProfilePageGuest from "@/src/components/ProfileGuest";
import ProfilePage from "@/src/components/ProfilePage";
import { useAuth } from "@/src/context/AuthProvider";


export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <ProfilePage /> : <ProfilePageGuest />}
    </View>
  );
}
