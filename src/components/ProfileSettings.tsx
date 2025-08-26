import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const ProfileSettings = () => {
  const handlePress = (action: string) => {
    console.log(`${action} pressed`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Past Events */}
      <View style={{ borderBottomWidth: 1, borderColor: Colors.grey, padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
          Past Events
        </Text>
        <TouchableOpacity onPress={() => handlePress('Past Events')}>
          <Text style={{ fontSize: 14, color: Colors.black }}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Settings */}
      <View style={{ marginTop: 8 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderColor: Colors.grey,
          }}
          onPress={() => handlePress('Edit Profile')}
        >
          <Ionicons name="person-outline" size={20} color={Colors.black} />
          <Text style={{ marginLeft: 12, fontSize: 15, color: Colors.black }}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderColor: Colors.grey,
          }}
          onPress={() => handlePress('Notifications')}
        >
          <Ionicons name="notifications-outline" size={20} color={Colors.black} />
          <Text style={{ marginLeft: 12, fontSize: 15, color: Colors.black }}>
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderColor: Colors.grey,
          }}
          onPress={() => handlePress('Payment Methods')}
        >
          <Ionicons name="card-outline" size={20} color={Colors.black} />
          <Text style={{ marginLeft: 12, fontSize: 15, color: Colors.black }}>
            Payment Methods
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderColor: Colors.grey,
          }}
          onPress={() => handlePress('Help & Support')}
        >
          <Ionicons name="help-circle-outline" size={20} color={Colors.black} />
          <Text style={{ marginLeft: 12, fontSize: 15, color: Colors.black }}>
            Help & Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
          }}
          onPress={() => handlePress('Logout')}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.pink} />
          <Text style={{ marginLeft: 12, fontSize: 15, color: Colors.pink }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;
