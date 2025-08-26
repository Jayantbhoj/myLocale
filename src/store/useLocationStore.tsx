import { create } from "zustand";
import * as Location from "expo-location";

type LocationType = {
  latitude: number | null;
  longitude: number | null;
  name: string; // city/region
};

type LocationState = {
  location: LocationType;
  loading: boolean;
  fetchLocation: () => Promise<void>;
  setLocation: (loc: LocationType) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  location: { latitude: null, longitude: null, name: "Set Location" },
  loading: false,

  fetchLocation: async () => {
    try {
      set({ loading: true });

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        set({
          location: { latitude: null, longitude: null, name: "Set Location" },
          loading: false,
        });
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      set({
        location: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          name: address[0]?.city || address[0]?.region || "Unknown",
        },
        loading: false,
      });
    } catch (e) {
      console.error("Error fetching location:", e);
      set({
        location: { latitude: null, longitude: null, name: "Error" },
        loading: false,
      });
    }
  },
  setLocation: (loc: LocationType) => set({ location: loc }),
}));
