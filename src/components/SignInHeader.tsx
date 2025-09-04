import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../constants/colors';

const { height } = Dimensions.get('window');

const SignInHeader = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.pink,
        height: height * 0.25, 
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        <Ionicons name="arrow-back" size={28} color={Colors.black} />
      </TouchableOpacity>

      {/* Logo */}
      {/* <Image
        source={require('../src/assets/image/light.png')} // replace with your logo path
        style={{ width: 80, height: 80, marginBottom: 10 }}
        resizeMode="contain"
      /> */}

      {/* Text below logo */}
      <Text style={{ fontSize: 20, fontWeight: '600', color: Colors.black }}>
        Welcome Back
      </Text>
    </SafeAreaView>
  );
};

export default SignInHeader;
