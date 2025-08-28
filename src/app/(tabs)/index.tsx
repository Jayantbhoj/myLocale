import EventCard from "@/src/components/eventCard";
import Colors from "@/src/constants/colors";
import { FlatList, View } from "react-native";

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
  },{
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
  },{
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

export default function NearYou() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}> 
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


