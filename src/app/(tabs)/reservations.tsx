import MyReservations from "@/src/components/MyReservations";
import { View, StyleSheet } from "react-native";
import Colors from "@/src/constants/colors";

export default function Reservations() {
  return (
    <View style={styles.container}> 
      <MyReservations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.white, 
  },
});
