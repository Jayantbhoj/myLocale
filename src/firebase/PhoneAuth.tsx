// import React, { useState, useEffect } from 'react';
// import { Button, TextInput, View, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import Colors from '../constants/colors';

// export default function PhoneSignIn() {
//   const [confirm, setConfirm] = useState(null);
//   const [code, setCode] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   // Monitor auth state
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log('User signed in:', user.phoneNumber);
//       }
//     });
//     return subscriber;
//   }, []);

//   // Send verification code
//   async function handleSignInWithPhoneNumber() {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber('+91 8800508791');
//       setConfirm(confirmation);
//     } catch (error) {
//       console.log('Error sending code:', error);
//     }
//   }

//   // Confirm code
//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <View style={{ backgroundColor: Colors.black, padding: 20 }}>
//         <Text>Enter phone number:</Text>
//         <TextInput
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           placeholder="+91 98765 43210"
//           keyboardType="phone-pad"
//           style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
//         />
//         <Button title="Get OTP" onPress={handleSignInWithPhoneNumber} />
//       </View>
//     );
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Enter OTP:</Text>
//       <TextInput
//         value={code}
//         onChangeText={setCode}
//         placeholder="123456"
//         keyboardType="number-pad"
//         style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
//       />
//       <Button title="Confirm Code" onPress={confirmCode} />
//     </View>
//   );
// }
