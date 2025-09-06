import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NormalizedLocation } from "../services/locationService";
import LocationSearch from "./EventLocationSearch";
import { createEvent } from "../services/eventsService";
import { useAuth } from "../context/AuthProvider";
import Colors from "../constants/colors";
import { useEventsStore } from "../store/useEventsStore";

export default function AddEvent() {
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [locationText, setLocationText] = useState("");
  const [location, setLocation] = useState<NormalizedLocation | null>(null);

  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<"date" | "start" | "end" | null>(null);

  const { user } = useAuth();

  const resetForm = () => {
    setName("");
    setDescription("");
    setCapacity("");
    setCoverImageUrl(null);
    setLocationText("");
    setLocation(null);
    setDate(new Date());
    setStartTime(null);
    setEndTime(null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setCoverImageUrl(result.assets[0].uri);
    }
  };

  const handleConfirm = (selected: Date) => {
    if (pickerMode === "date") {
      setDate(selected);
    } else if (pickerMode === "start") {
      const merged = new Date(date);
      merged.setHours(selected.getHours());
      merged.setMinutes(selected.getMinutes());
      setStartTime(merged);
    } else if (pickerMode === "end") {
      const merged = new Date(date);
      merged.setHours(selected.getHours());
      merged.setMinutes(selected.getMinutes());
      setEndTime(merged);
    }
    setPickerMode(null);
  };

  const handleSubmit = async () => {
    if (!coverImageUrl) {
      Alert.alert("Missing Image", "Please select a cover image before submitting.");
      return;
    }
    if (!location) {
      Alert.alert("Missing Location", "Please select a location.");
      return;
    }
    if (!startTime || !endTime) {
      Alert.alert("Missing Time", "Please select start and end times.");
      return;
    }

    try {
      const newEvent = await createEvent(
        {
          creator_id: user?.id!,
          name,
          description,
          location: locationText,
          city: location.city,
          locality: location.locality,
          state: location.state,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          capacity: parseInt(capacity) || 0,
          cover_image_url: coverImageUrl,
          date: date.toISOString().split("T")[0],
        },
        user?.id!
      );

      Alert.alert(" Success", `Event created: ${newEvent.name}`);
      resetForm();
      setModalVisible(false);
    } catch (err: any) {
      console.error("Error creating event:", err);
      Alert.alert("Error", err.message || "Failed to create event.");
    }
    useEventsStore.getState().refreshMyEvents();
  };

  return (
    <>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add  </Text>
        </TouchableOpacity>


      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="fullScreen">
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Event</Text>

            <TextInput
              placeholder="Event Name"
              placeholderTextColor={Colors.gray}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor={Colors.gray}
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TextInput
              placeholder="Capacity"
              placeholderTextColor={Colors.gray}
              style={styles.input}
              value={capacity}
              onChangeText={setCapacity}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Full Location (e.g. Venue name, address)"
              placeholderTextColor={Colors.gray}
              style={styles.input}
              value={locationText}
              onChangeText={setLocationText}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>
                {coverImageUrl ? " Image Selected" : "📷 Pick Cover Image"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Select Event Location</Text>
            <LocationSearch onSelect={(loc) => setLocation(loc)} />
            {location && (
              <Text style={styles.locationPreview}>
                📍 {location.city}
                {location.locality ? `, ${location.locality}` : ""}, {location.state}
              </Text>
            )}

            <Text style={styles.sectionTitle}>Event Date & Time</Text>

            {/* Date */}
            <TouchableOpacity style={styles.input} onPress={() => setPickerMode("date")}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>

            {/* Start time */}
            <TouchableOpacity style={styles.input} onPress={() => setPickerMode("start")}>
              <Text>{startTime ? startTime.toLocaleTimeString() : "Select Start Time"}</Text>
            </TouchableOpacity>

            {/* End time */}
            <TouchableOpacity style={styles.input} onPress={() => setPickerMode("end")}>
              <Text>{endTime ? endTime.toLocaleTimeString() : "Select End Time"}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={pickerMode !== null}
              mode={pickerMode === "date" ? "date" : "time"}
              onConfirm={handleConfirm}
              onCancel={() => setPickerMode(null)}
            />

            {startTime && endTime && (
              <Text style={{ marginTop: 10, fontWeight: "600" }}>
                📅 {date.toDateString()} | ⏰ {startTime.toLocaleTimeString()} →{" "}
                {endTime.toLocaleTimeString()}
              </Text>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}> Create Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: Colors.gray }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  ctaContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  ctaTitle: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  ctaSubtitle: { fontSize: 14, color: "#666", marginBottom: 12, textAlign: "center" },
  addButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.pink,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: "#fafafa",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },
  imageButtonText: { fontSize: 16, fontWeight: "500" },
  sectionTitle: { marginVertical: 8, fontWeight: "600", fontSize: 16 },
  locationPreview: { marginVertical: 6, color: "#333" },
  submitButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
});
