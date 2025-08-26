import ProfileHeader from "@/src/components/ProfileHeader";
import ProfileSettings from "@/src/components/ProfileSettings";
import { Text, View, Button } from "react-native";
import { useUserStore } from "@/src/store/userStore";
import ProfilePageGuest from "@/src/components/ProfileGuest";

export default function Index() {
  const { isSignedIn } = useUserStore();

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader />
      {isSignedIn ? (
          <ProfileSettings />
      ) : (
          <ProfilePageGuest />
      )}
    </View>
  );
}
