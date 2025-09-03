import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/colors";
import SignUpForm from "../(auth)/signup";

export default function SignupModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedHeight, {
        toValue: 500,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(animatedHeight, {
        toValue: 500 + e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedHeight, {
        toValue: 500,
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
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContent, { height: animatedHeight }]}>
              <SignUpForm />
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
  closeText: { textAlign: "center", color: Colors.gray, fontSize: 14 },
});
