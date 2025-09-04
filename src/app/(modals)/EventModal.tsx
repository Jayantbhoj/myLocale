import Colors from "@/src/constants/colors";
import { Event } from "@/src/schemas/internal/eventsSchema";
import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { reserveSpot } from "@/src/services/reservationService";
import { useAuth } from "@/src/context/AuthProvider"; 

const { width, height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  event: (Event & { creatorName?: string; capacity?: number }) | null;
  onClose: () => void;
};

export default function EventModal({ visible, event, onClose }: Props) {
  const { user } = useAuth(); 

  if (!event) return null;

  const eventDate = new Date(event.date);
  const dateLabel = isNaN(eventDate.getTime())
    ? String(event.date)
    : eventDate.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  const startTime = new Date(event.start_time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(event.end_time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleRSVP = async () => {
    if (!user?.id) {
      Alert.alert("Login required", "You need to log in to RSVP.");
      return;
    }

    try {
      const reservation = await reserveSpot(
        user.id,
        event.id,
        event.capacity ?? 50 
      );

      Alert.alert(
        "RSVP Successful",
        `You are ${reservation.status} for ${event.name}`
      );
      onClose();
    } catch (err: any) {
      console.error("RSVP failed:", err);
      Alert.alert("RSVP Failed", err.message || "Something went wrong.");
    }
  };

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  event.cover_image_url ??
                  "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
              }}
              style={styles.image}
            />
          </View>

          {/* Event Details Section */}
          <View style={styles.details}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.subText}>
              {event.location}, {event.city}, {event.state}
            </Text>

            {/* Date & Time Container */}
            <View style={styles.datetimeContainer}>
              <Text style={styles.dateText}>{dateLabel}</Text>
              <Text style={styles.timeText}>
                {startTime} → {endTime}
              </Text>
            </View>
          </View>

          {/* Body Content */}
          <View style={styles.body}>
            {event.creatorName && (
              <>
                <Text style={styles.label}>Organiser</Text>
                <Text style={styles.value}>{event.creatorName}</Text>
              </>
            )}

            {event.description && (
              <>
                <Text style={styles.label}>About</Text>
                <Text style={styles.value}>{event.description}</Text>
              </>
            )}
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.rsvpButton} onPress={handleRSVP}>
            <Text style={styles.rsvpText}>RSVP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const HEADER_HEIGHT = height * 0.35;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: {
    height: HEADER_HEIGHT,
    width: width,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 6,
  },
  subText: { fontSize: 16, color: Colors.gray, marginTop: 2 },
  datetimeContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.gray + "15",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: Colors.gray,
  },
  body: { padding: 16 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12, color: Colors.gray },
  value: { fontSize: 16, marginTop: 4, color: Colors.black },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.white,
  },
  rsvpButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  rsvpText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  closeButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  closeText: { color: Colors.gray, fontSize: 14 },
});
