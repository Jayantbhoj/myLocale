import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import { useAuth } from "../context/AuthProvider"; // ✅ use context

const ProfileHeader = () => {
  const router = useRouter();
  const { user } = useAuth(); // ✅ directly get user from context

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.lightPink,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: 40 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center", marginRight: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: Colors.black }}>
            Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.black }}>
          Hey, {user?.first_name ?? "Guest"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;
