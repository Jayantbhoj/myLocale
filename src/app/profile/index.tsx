import { View } from "react-native";
import { useUserStore } from "@/src/store/userStore";
import ProfilePageGuest from "@/src/components/ProfileGuest";
import ProfilePage from "@/src/components/ProfilePage";

export default function Index() {
  const { isSignedIn } = useUserStore();

  return (
    <View style={{ flex: 1 }}>
      
      {isSignedIn ? (
          <ProfilePage />
      ) : (
          <ProfilePageGuest />
      )}
    </View>
  );
}
