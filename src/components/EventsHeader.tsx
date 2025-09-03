import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";
import { Event } from "../schemas/internal/eventsSchema";
import AddEvent from "./AddEvent";


interface MyEventsHeaderProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function MyEventsHeader({
  upcomingEvents=[],
  pastEvents=[],
}: MyEventsHeaderProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <LinearGradient
      colors={["#ED254E", "#FFF9FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView>
        <Text style={styles.title}>My Events</Text>

        <View style={styles.container}>
          <AddEvent/>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.black,
    textAlign: "center",
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  activeTabText: {
    color: Colors.pink,
    fontWeight: "700",
  },
});
