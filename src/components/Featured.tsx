import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Colors from "@/src/constants/colors";
import { Event } from "@/src/schemas/internal/eventsSchema";
import { fetchFeaturedEvents } from "@/src/services/eventsService";
import { useLocationStore } from "@/src/store/useLocationStore";
import EventCard from "./eventCard";

const { width } = Dimensions.get("window");

export default function Featured() {
  const { location } = useLocationStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Event>>(null);

  // Fetch featured events whenever the city changes
  useEffect(() => {
    if (!location?.name) return;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchFeaturedEvents(location.name, 3);
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch featured events", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [location?.name]); // reactive to city changes

  // Memoized sorted events
  const featuredEvents = useMemo(() => {
    return [...events].sort(
      (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  }, [events]);

  // Memoized scroll handler
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    },
    []
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.pink} />
      </View>
    );
  }

  if (featuredEvents.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: Colors.gray }}>No featured events available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={styles.heading}>Featured</Text>
        <View style={styles.line} />
      </View>

      <FlatList
        ref={flatListRef}
        data={featuredEvents}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width, padding: 10 }}>
            <EventCard event={item} />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {featuredEvents.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? Colors.pink : Colors.gray },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray,
  },
  heading: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  loader: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
