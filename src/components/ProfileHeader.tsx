import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store/userStore';
import Colors from '../constants/colors';

const ProfileHeader = () => {
  const router = useRouter();

  const firstName = useUserStore(state => state.firstName);
  const isSignedIn = useUserStore(state => state.isSignedIn);

  return (
    <SafeAreaView style={{
    backgroundColor: Colors.lightPink,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // ensures background respects the curve
  }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40 }}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 40 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.black }}>Profile</Text>
        </View>
      </View>

      {isSignedIn ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 10, paddingBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
            Hey, {firstName}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => router.push('/signup')}
          style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 10, paddingBottom: 20 }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
            Please Sign In
          </Text>
          <Ionicons
            name="chevron-forward-circle"
            size={18}
            color={Colors.black}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ProfileHeader;
