import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/colors";

export default function LoginModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [phone, setPhone] = useState("");
  const isValid = phone.length === 10;

  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedHeight, {
        toValue: 250, // initial modal height
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(animatedHeight, {
        toValue: 250 + e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedHeight, {
        toValue: 250,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* TouchableWithoutFeedback captures taps outside modal */}
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContent, { height: animatedHeight }]}>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Enter your phone number to proceed</Text>

              <View style={styles.inputRow}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor={Colors.grey}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  !isValid && styles.loginButtonDisabled,
                  { shadowColor: Colors.black, shadowOpacity: isValid ? 0.2 : 0 },
                  { elevation: isValid ? 3 : 0 },
                ]}
                disabled={!isValid}
              >
                <Text style={styles.loginText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: "600", color: Colors.black },
  subtitle: { fontSize: 14, color: Colors.grey, marginTop: 8, marginBottom: 20 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  countryCode: { fontSize: 16, marginRight: 8, color: Colors.black },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  loginButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButtonDisabled: { backgroundColor: Colors.grey },
  loginText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  closeText: { textAlign: "center", color: Colors.grey, fontSize: 14 },
});
