// components/LocationModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/colors";
import PopularCities from "@/src/components/PopularCities";
import { useLocationStore } from "@/src/store/useLocationStore";
import GetCurrentLocationButton from "@/src/components/GetCurrentLocation";
import LocationSearchBar from "@/src/components/LocationSearchBar";

type Location = {
  name: string;
  [key: string]: any; // in case your location object has extra fields
};

type LocationModalProps = {
  visible: boolean;
  onClose: () => void;
  location?: Location | null;
};

export default function LocationModal({
  visible,
  onClose,
  location,
}: LocationModalProps) {
  const setLocation = useLocationStore((state) => state.setLocation);
    return (
    <Modal
  visible={visible}
  animationType="slide"
  presentationStyle="pageSheet"
  transparent={false}
  onRequestClose={onClose}
>
  <View style={styles.outer}>
    {/* SafeAreaView now only wraps the content below the top inset */}
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Location</Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={28} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View>
            <LocationSearchBar onSelectCity={onClose}/>
        </View>
        <View>
            <GetCurrentLocationButton onSuccess={onClose}/> 
        </View>

        {/* Popular Cities */}
        <PopularCities
          onSelect={(city) => {
            setLocation({
              latitude: null,
              longitude: null,
              name: city,
            });
            onClose();
          }}
        />
      </View>
    </SafeAreaView>
  </View>
</Modal>

  );
}
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  current: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
});
