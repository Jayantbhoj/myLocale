import Header from '@/src/components/header';
import Colors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: Colors.pink,
        tabBarInactiveTintColor: Colors.grey,
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
        name="parties"
        options={{
          title: 'Parties',
          tabBarIcon: ({ color }) => <Ionicons name="flame" size={28} color= { color }/>,
          header: () => <Header />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="addEvents"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={30} color= { color }/>,
          header: () => <Header />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="myEvents"
        options={{
          title: 'My Events',
          tabBarIcon: ({ color }) => <Ionicons name="menu" size={28} color={color} />,
          header: () => <Header />,
        }}
      />
    </Tabs>
  );
}
