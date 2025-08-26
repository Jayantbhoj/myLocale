// src/components/PopularCities.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import Colors from "@/src/constants/colors";

const cities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Jaipur",
  "Chandigarh",
  "Hyderabad",
  "Pune",
  "Goa",
  // add more cities as needed
];

// Map lowercase city names to require
const cityIcons: Record<string, any> = {
  delhi: require("../assets/icons/delhi.png"),
  mumbai: require("../assets/icons/mumbai.png"),
  bengaluru: require("../assets/icons/bengaluru.png"),
  jaipur: require("../assets/icons/jaipur.png"),
  chandigarh: require("../assets/icons/chandigarh.png"),
  hyderabad: require("../assets/icons/hyderabad.png"),
  pune: require("../assets/icons/pune.png"),
  goa: require("../assets/icons/goa.png"),
  // add other city icons here
};

type PopularCitiesProps = {
  onSelect: (city: string) => void;
};

export default function PopularCities({ onSelect }: PopularCitiesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Cities</Text>
      <FlatList
        data={cities}
        numColumns={2}
        keyExtractor={(item) => item}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => {
          const iconSource = cityIcons[item.toLowerCase()] || require("../assets/icons/city.png");
          return (
            <TouchableOpacity style={styles.cityButton} onPress={() => onSelect(item)}>
              <Image
                source={iconSource}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.cityText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.black,
  },
  cityButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.lightPink,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  cityText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
});
