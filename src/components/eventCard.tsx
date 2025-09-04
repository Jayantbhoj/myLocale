import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/colors";
import EventModal from "../app/(modals)/EventModal";
import { Event } from "../schemas/internal/eventsSchema";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  if (!event) {
    return null; 
  }
  const [modalVisible, setModalVisible] = useState(false);
  const eventDate = new Date(event.start_time);
  const dateLabel = isNaN(eventDate.getTime())
    ? String(event.start_time)
    : eventDate.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
        style={styles.card}
      >
        {event.cover_image_url && (
          <Image
            source={{ uri: event.cover_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{dateLabel}</Text>
          </View>
          <Text numberOfLines={1} style={styles.title}>
            {event.name}
          </Text>
          <View style={styles.metaRow}>
            <Text numberOfLines={1} style={styles.metaText}>
              {event.city}, {event.state}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <EventModal
        visible={modalVisible}
        event={event}
        onClose={() => setModalVisible(false)}
        onRSVP={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
}

const RADIUS = 12;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: RADIUS,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  image: { width: "100%", aspectRatio: 1 },
  content: { paddingHorizontal: 12, paddingVertical: 10, gap: 6 },
  title: { fontSize: 16, fontWeight: "700", color: Colors.black },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  metaText: { fontSize: 12, color: Colors.gray, flexShrink: 1 },
});
