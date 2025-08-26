// src/components/EventList.tsx
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EventCard from "./eventCard";


export type Event = {
  id: string;
  imageUrl: string;
  name: string;
  location: string;
  date: string | Date;
};

type Props = {
  events: Event[];
  onEventPress?: (event: Event) => void;
  containerStyle?: object;
};

export default function EventList({ events, onEventPress, containerStyle }: Props) {
  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={{ marginBottom: 14, marginTop: index === 0 ? 8 : 0 }}>
          <EventCard
            {...item}
            onPress={() => onEventPress?.(item)}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContainer, containerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
