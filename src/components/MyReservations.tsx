import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import Colors from "@/src/constants/colors";
import { Reservation } from "@/src/schemas/internal/reservationsSchema";
import ReservationCard from "@/src/components/ReservationCard";
import { getUserReservations } from "../services/reservationService";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "expo-router";

export default function MyReservations() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadReservations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getUserReservations(user.id);
        setReservations(data);
      } catch (err) {
        console.error("Failed to fetch reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [user]);


  if (!user) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Please sign in to view reservations</Text>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => router.push("/(modals)/signUpModal")} 
        >
          <Text style={styles.signInText}>Go to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.pink} />
      </View>
    );
  }

  if (reservations.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No reservations yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reservations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 14 }}>
          <ReservationCard reservation={item} />
        </View>
      )}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 12,
    textAlign: "center",
  },
  signInBtn: {
    backgroundColor: Colors.pink,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signInText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
