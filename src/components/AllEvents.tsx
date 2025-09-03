import EventCard from "@/src/components/eventCard";
import Colors from "@/src/constants/colors";
import { FlatList, View, Text, StyleSheet } from "react-native";

const data = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    name: "Indie Music Night",
    location: "Hauz Khas, New Delhi",
    date: "2025-09-12",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?q=80&w=1200",
    name: "Tech Meetup",
    location: "Connaught Place, New Delhi",
    date: new Date(),
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    name: "Indie Music Night",
    location: "Hauz Khas, New Delhi",
    date: "2025-09-12",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?q=80&w=1200",
    name: "Tech Meetup",
    location: "Connaught Place, New Delhi",
    date: new Date(),
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    name: "Indie Music Night",
    location: "Hauz Khas, New Delhi",
    date: "2025-09-12",
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?q=80&w=1200",
    name: "Tech Meetup",
    location: "Connaught Place, New Delhi",
    date: new Date(),
  },
  {
    id: "7",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    name: "Indie Music Night",
    location: "Hauz Khas, New Delhi",
    date: "2025-09-12",
  },
  {
    id: "8",
    imageUrl:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?q=80&w=1200",
    name: "Tech Meetup",
    location: "Connaught Place, New Delhi",
    date: new Date(),
  },
];

export default function AllEvents() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white, padding:6, }}>
      {/* Heading with borders */}
      <View style={styles.headingContainer}>
        <View style={styles.line} />
        <Text style={styles.heading}>All Events</Text>
        <View style={styles.line} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 14 }}>
            <EventCard {...item} />
          </View>
        )}
        style={{ backgroundColor: Colors.white }}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray,
  },
  heading: {
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
});
