import MyEventsHeader from '@/src/components/EventsHeader';
import Header from '@/src/components/header';
import ReservationsHeader from '@/src/components/ReservationsHeader';
import Colors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: Colors.pink,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: { backgroundColor: Colors.white },
        headerStyle: { backgroundColor: Colors.white}
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Near You',
          tabBarIcon: ({ color }) => <Ionicons name="compass" size={28} color= { color }/>,
          header: () => <Header />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: 'Reservations',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={30} color= { color }/>,
          header: () => <ReservationsHeader confirmedReservations={[]}
  waitlistedReservations={[]}/>,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="myEvents"
        options={{
          title: 'My Events',
          tabBarIcon: ({ color }) => <Ionicons name="menu" size={28} color={color} />,
          headerShown:true,
          header: () => <MyEventsHeader />,
        }}
      />
    </Tabs>
  );
}
