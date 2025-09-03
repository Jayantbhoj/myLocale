import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";
import { useLocationStore } from "../store/useLocationStore";
import LocationModal from "../app/(modals)/LocationModal";
import SearchBar from "./searchbar";


export default function Header() {
  const router = useRouter();
  const { location, loading, fetchLocation } = useLocationStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!location.latitude || !location.longitude) {
      fetchLocation();
    }
  }, []);


  return (
    <LinearGradient
      colors={["#ED254E", "#FFF9FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.headerBox}>
          {/* Location + User */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="location-outline" size={20} color={Colors.black} />
              {loading ? (
                <ActivityIndicator size="small" color={Colors.black} style={{ marginLeft: 0 }} />
              ) : (
                 <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 0 }}>
                    <Text style={styles.locationText}>
                        {location?.name}
                    </Text>
                    <Ionicons
                        name="chevron-down"
                        size={16}
                        color={Colors.black}
                        style={{ marginLeft: 4 }}
                    />
                </View> 
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Ionicons name="person-circle-outline" size={28} color={Colors.black} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={{ marginTop: 10 }}>
            <SearchBar />
          </View>
        </View>
        {/* Modal */}
      <LocationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        location={location}
      />
      </SafeAreaView>

      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "auto",
  },
  safeArea: {
    width: "100%",
    paddingBottom: 0,
    marginBottom: 0,
  },
  headerBox: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
});
