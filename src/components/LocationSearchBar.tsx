import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
import Colors from "@/src/constants/colors";
import { useLocationStore } from "@/src/store/useLocationStore";
import { CITIES } from "../constants/cities";

type LocationSearchBarProps = {
  onSelectCity: (city: string) => void;
};

export default function LocationSearchBar({ onSelectCity }: LocationSearchBarProps) {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [query, setQuery] = React.useState("");
  const [filteredCities, setFilteredCities] = React.useState<string[]>([]);

  const handleChange = (text: string) => {
    setQuery(text);
    if (!text.trim()) return setFilteredCities([]);
    const filtered = CITIES.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSelect = (city: string) => {
    setLocation({ latitude: null, longitude: null, name: city });
    setQuery(city);
    setFilteredCities([]);
    onSelectCity(city); 
  };

  return (
    <View style={styles.container}>
  <TextInput
    placeholder="Search city or area"
    value={query}
    onChangeText={handleChange}
    style={styles.input}
  />

  {query.trim() !== "" && (
    <View style={styles.overlay}>
      {filteredCities.length > 0 ? (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.item}>
          <Text style={[styles.itemText, { color: Colors.gray }]}>
            Sorry, city not found.
          </Text>
        </View>
      )}
    </View>
  )}
</View>

  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    zIndex: 1,
    backgroundColor: Colors.white,
  },
  overlay: {
    position: "absolute",
    top: 48, 
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderColor: Colors.gray,
    borderRadius: 8,
    maxHeight: 250,
    zIndex: 10, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
});
