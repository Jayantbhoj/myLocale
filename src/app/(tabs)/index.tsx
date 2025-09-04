import AllEvents from "@/src/components/AllEvents";
import Featured from "@/src/components/Featured";
import Colors from "@/src/constants/colors";
import { FlatList, View } from "react-native";

export default function NearYou() {
  return (
    <FlatList
      data={[{}]} 
      keyExtractor={(_, index) => index.toString()}
      renderItem={null} 
      ListHeaderComponent={
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <Featured />
          <AllEvents />
        </View>
      }
    />
  );
}
