import Colors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// import PhoneSignIn from '@/src/firebase/PhoneAuth';



const { height } = Dimensions.get('window');

const AuthScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Header */}
      <View
        style={{
          height: height * 0.3,
          backgroundColor: Colors.pink,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.push('/')}
          style={{ position: 'absolute', left: 16, top: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>

        {/* Logo */}
        <View style={{ marginBottom: 8 }}>
          <Ionicons name="person-circle-outline" size={64} color={Colors.black} />
        </View>

        {/* Title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>
           / Log in
        </Text>
      </View>

        {/* <PhoneSignIn/> */}
     

    </SafeAreaView>
  );
};

export default AuthScreen;
