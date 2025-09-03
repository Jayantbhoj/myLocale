import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "@/src/constants/colors";
import { Event } from "@/src/schemas/internal/eventsSchema";

interface Props {
  event: Event;
}

export default function MyEventCard({ event }: Props) {
  const eventDate = new Date(event.start_time).toLocaleDateString();
  const eventTime = `${new Date(event.start_time).toLocaleTimeString()} → ${new Date(event.end_time).toLocaleTimeString()}`;

  return (
    <View style={styles.card}>
      {event.cover_image_url && (
        <Image source={{ uri: event.cover_image_url }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.date}>{eventDate}</Text>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.time}>{eventTime}</Text>
        <Text style={styles.location}>{event.city}, {event.state}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
  },
  content: {
    padding: 12,
  },
  date: {
    fontSize: 13,
    color: Colors.gray,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  time: {
    fontSize: 13,
    color: Colors.black,
    marginTop: 6,
  },
  location: {
    fontSize: 13,
    marginTop: 2,
    color: Colors.pink,
  },
});
