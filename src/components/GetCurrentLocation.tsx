// components/GetCurrentLocationButton.tsx
import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useLocationStore } from "@/src/store/useLocationStore";
import Colors from "@/src/constants/colors";

type Props = {
  onSuccess?: () => void; // callback to close modal
};

export default function GetCurrentLocationButton({ onSuccess }: Props) {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to get current location.");
        setLoading(false);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        name: address[0]?.city || address[0]?.region || "Unknown",
      });

      if (onSuccess) onSuccess(); // call the callback to close modal
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to get current location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.black} />
      ) : (
        <Text style={styles.text}>Use Current Location</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 8,

    alignItems: "center",
    marginVertical: 12,
  },
  text: {
    color: Colors.pink,
    fontSize: 16,
    fontWeight: "600",
  },
});
