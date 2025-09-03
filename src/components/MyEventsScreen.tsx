import React, { useEffect, useState, useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthProvider";
import MyEventCard from "@/src/components/MyEventCard";
import Colors from "@/src/constants/colors";
import { Event } from "@/src/schemas/internal/eventsSchema";
import { fetchMyEvents } from "../services/eventsService";
import { useEventsStore } from "../store/useEventsStore";
import AddEvent from "@/src/components/AddEvent"; // your AddEvent modal

export default function MyEventsScreen() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const lastUpdated = useEventsStore((state) => state.lastUpdated);

  useEffect(() => {
    if (!user) return;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchMyEvents(user.id);
        setEvents(data);
      } catch (err) {
        console.error("Failed to load my events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user, lastUpdated]);

  const sortedUpcomingEvents = useMemo(() => {
    const now = new Date().getTime();
    return events
      .filter(e => new Date(e.start_time).getTime() >= now)
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [events]);

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      ) : !user ? (
        <View style={styles.center}>
          <Text>You must be signed in to view your events.</Text>
        </View>
      ) : sortedUpcomingEvents.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.ctaTitle}>No events created yet.</Text>
          <Text style={styles.ctaSubtitle}>
            Tap Add Event to add your first event now!
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={sortedUpcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyEventCard event={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
  list: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 16,
  },
});
