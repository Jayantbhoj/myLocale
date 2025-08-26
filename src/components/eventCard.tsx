// src/components/EventCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";

type Props = {
  imageUrl: string;
  name: string;
  location: string;
  date: string | Date;
  onPress?: (e: GestureResponderEvent) => void;
};

export default function EventCard({
  imageUrl,
  name,
  location,
  date,
  onPress,
}: Props) {
  const eventDate =
    typeof date === "string" ? new Date(date) : (date as Date);

  const dateLabel = isNaN(eventDate.getTime())
    ? String(date)
    : eventDate.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{dateLabel}</Text>
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>

        {/* Location last */}
        <View style={styles.metaRow}>
          <Text numberOfLines={1} style={styles.metaText}>
            {location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  metaText: {
    fontSize: 12,
    color: Colors.grey,
    flexShrink: 1,
  },
});
