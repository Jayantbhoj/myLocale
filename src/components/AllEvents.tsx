import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "@/src/constants/colors";
import EventCard from "@/src/components/eventCard";
import { Event } from "@/src/schemas/internal/eventsSchema";
import { fetchAllEvents } from "@/src/services/eventsService"; 

export default function AllEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchAllEvents(); 
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.pink} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Heading with borders */}
      <View style={styles.headingContainer}>
        <View style={styles.line} />
        <Text style={styles.heading}>All Events</Text>
        <View style={styles.line} />
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 14, padding: 14 }}>
            <EventCard event={item} /> 
          </View>
        )}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray,
  },
  heading: {
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
