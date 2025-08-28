import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import ProfileHeader from './ProfileHeader';

const ProfilePage = () => {
  const handlePress = (action: string) => {
    console.log(`${action} pressed`);
  };

  return (
    <>
      <ProfileHeader />
      <ScrollView style={styles.container}>

        {/* Profile Settings */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('Edit Profile')}>
            <Ionicons name="person-outline" size={22} color={Colors.black} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handlePress('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={Colors.black} />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handlePress('Help & Support')}>
            <Ionicons name="help-circle-outline" size={22} color={Colors.black} />
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logout]} onPress={() => handlePress('Logout')}>
            <Ionicons name="log-out-outline" size={22} color={Colors.pink} />
            <Text style={[styles.buttonText, { color: Colors.pink }]}>Logout</Text>
          </TouchableOpacity>
        </View>
              {/* Past Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Events</Text>
          <TouchableOpacity onPress={() => handlePress('Past Events')}>
            <Text style={styles.linkText}>View All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    margin:4,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,      // curved edges
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  linkText: {
    fontSize: 14,
    color: Colors.pink,
    fontWeight: '500',
  },
  section: {
    margin:4,
    borderWidth: 1,
    borderColor: Colors.grey,   // light gray border
    borderRadius: 16,      // curved edges
    padding: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.black,
  },
  logout: {
    borderBottomWidth: 0,
  },
});

export default ProfilePage;
