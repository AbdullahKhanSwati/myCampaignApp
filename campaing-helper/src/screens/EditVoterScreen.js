"use client"

import React, { useState, useEffect } from "react"
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import Toast from "react-native-toast-message";
import BaseUrl from "../../BaseUrl";

export default function EditVoterScreen({ navigation }) {
  const route = useRoute();
  const { voter } = route.params;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetNo: "",
    streetName: "",
    aptUnit: "",
    residenceCity: "",
    residenceState: "",
    residenceZip: "",
    municipality: "",
    ward: "",
    district: "",
    party: "",
    phone: "",
    email: "",
    notes: "",
    status: "undecided"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (voter) {
      setFormData({
        firstName: voter.firstName || "",
        lastName: voter.lastName || "",
        streetNo: voter.streetNo || "",
        streetName: voter.streetName || "",
        aptUnit: voter.aptUnit || "",
        residenceCity: voter.residenceCity || "",
        residenceState: voter.residenceState || "",
        residenceZip: voter.residenceZip || "",
        municipality: voter.municipality || "",
        ward: voter.ward || "",
        district: voter.district || "",
        party: voter.party || "",
        phone: voter.phone || "",
        email: voter.email || "",
        notes: voter.notes || "",
        status: voter.status || "undecided"
      });
    }
  }, [voter]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!voter?._id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Voter ID is missing.",
      });
      return;
    }

    try {
      setIsSaving(true);
      const response = await axios.put(`${BaseUrl}/voter/${voter._id}`, formData);

      if (response.data.success) {
        const updatedVoter = response.data.data;
        Toast.show({
          type: "success",
          text1: "Details Updated",
          text2: "Voter details have been updated successfully.",
        });
        // Navigate back - NotesScreen will refresh data on focus
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: response.data.message || "Could not update voter details.",
        });
      }
    } catch (error) {
      console.error("EditVoterScreen: Error updating voter:", error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: error.response?.data?.message || "Failed to connect to the server.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const statusOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Moved", value: "moved" },
    { label: "Undecided", value: "undecided" }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>✏️ Edit Voter Details</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(value) => handleChange("firstName", value)}
              placeholder="First Name"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(value) => handleChange("lastName", value)}
              placeholder="Last Name"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.statusOption,
                    formData.status === option.value && styles.statusOptionActive
                  ]}
                  onPress={() => handleChange("status", option.value)}
                >
                  <Text
                    style={[
                      styles.statusOptionText,
                      formData.status === option.value && styles.statusOptionTextActive
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Address Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Number</Text>
            <TextInput
              style={styles.input}
              value={formData.streetNo}
              onChangeText={(value) => handleChange("streetNo", value)}
              placeholder="Street Number"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Street Name</Text>
            <TextInput
              style={styles.input}
              value={formData.streetName}
              onChangeText={(value) => handleChange("streetName", value)}
              placeholder="Street Name"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apt/Unit</Text>
            <TextInput
              style={styles.input}
              value={formData.aptUnit}
              onChangeText={(value) => handleChange("aptUnit", value)}
              placeholder="Apt/Unit (optional)"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, styles.inputGroupHalf]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                value={formData.residenceCity}
                onChangeText={(value) => handleChange("residenceCity", value)}
                placeholder="City"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={[styles.inputGroup, styles.inputGroupHalf]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                value={formData.residenceState}
                onChangeText={(value) => handleChange("residenceState", value)}
                placeholder="State"
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ZIP Code</Text>
            <TextInput
              style={styles.input}
              value={formData.residenceZip}
              onChangeText={(value) => handleChange("residenceZip", value)}
              placeholder="ZIP Code"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Political Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Political Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Municipality</Text>
            <TextInput
              style={styles.input}
              value={formData.municipality}
              onChangeText={(value) => handleChange("municipality", value)}
              placeholder="Municipality"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, styles.inputGroupHalf]}>
              <Text style={styles.label}>Ward</Text>
              <TextInput
                style={styles.input}
                value={formData.ward}
                onChangeText={(value) => handleChange("ward", value)}
                placeholder="Ward"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={[styles.inputGroup, styles.inputGroupHalf]}>
              <Text style={styles.label}>District</Text>
              <TextInput
                style={styles.input}
                value={formData.district}
                onChangeText={(value) => handleChange("district", value)}
                placeholder="District"
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Party</Text>
            <TextInput
              style={styles.input}
              value={formData.party}
              onChangeText={(value) => handleChange("party", value)}
              placeholder="Party Affiliation"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              placeholder="Phone Number"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Email Address"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>General Notes</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              value={formData.notes}
              onChangeText={(value) => handleChange("notes", value)}
              placeholder="Add general notes about this voter..."
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>💾 Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    backgroundColor: "#1F2937",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    color: "#DC2626",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB",
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  section: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#374151",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupHalf: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#F9FAFB",
    fontSize: 16,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusOption: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
  },
  statusOptionActive: {
    borderColor: "#DC2626",
    backgroundColor: "#7F1D1D",
  },
  statusOptionText: {
    color: "#E5E7EB",
    fontWeight: "500",
    fontSize: 14,
  },
  statusOptionTextActive: {
    color: "#FCD34D",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
    shadowColor: "#DC2626",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})

