import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "@/src/constants/colors";
import { Reservation } from "../schemas/internal/reservationsSchema";


type Props = {
  reservation: Reservation;
};

export default function ReservationCard({ reservation }: Props) {
  const event = reservation.events;

  if (!event) return null; 

  const eventDate = new Date(event.start_time).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  
  const statusColors: Record<Reservation["status"], string> = {
    confirmed: "#28a745",
    waitlisted: "#ff9800",
    cancelled: Colors.gray,
  };

  return (
    <View style={styles.card}>
      {event.cover_image_url && (
        <Image source={{ uri: event.cover_image_url }} style={styles.image} />
      )}

      <View style={styles.content}>
        <Text style={styles.date}>{eventDate}</Text>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.location}>{event.location}</Text>

        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[reservation.status] + "22" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: statusColors[reservation.status] },
            ]}
          >
            {reservation.status.toUpperCase()}
          </Text>
        </View>
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
  location: {
    fontSize: 13,
    marginTop: 2,
    color: Colors.pink,
  },
  statusBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
