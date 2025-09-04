import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { normalizePhotonFeature, NormalizedLocation } from "@/src/services/locationService";

export default function LocationSearch({
  onSelect,
}: {
  onSelect: (loc: NormalizedLocation) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NormalizedLocation[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const timeout = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
          );
          const data = await res.json();
          const locations = data.features.map((f: any) => normalizePhotonFeature(f));
          setResults(locations);
        } catch (e) {
          console.error("OSM search error:", e);
          setResults([]);
        }
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View>
      <TextInput
        placeholder="Search location"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      {results.map((loc, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.item}
          onPress={() => {
            onSelect(loc);
            setQuery(loc.city); 
            setResults([]);
          }}
        >
          <Text>{`${loc.city}${loc.locality ? ", " + loc.locality : ""}, ${loc.state}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 4 },
  item: { padding: 10, backgroundColor: "#eee", marginBottom: 4, borderRadius: 6 },
});
