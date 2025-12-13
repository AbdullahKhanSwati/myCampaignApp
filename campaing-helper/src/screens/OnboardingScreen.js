"use client"

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import BaseUrl from "../../BaseUrl.js";

const inferMimeTypeFromName = (filename = "") => {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".xlsx")) {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
  if (lower.endsWith(".xls")) {
    return "application/vnd.ms-excel";
  }
  if (lower.endsWith(".csv")) {
    return "text/csv";
  }
  return "application/octet-stream";
};

export default function OnboardingScreen({ navigation }) {
  const route = useRoute();
  const fromSettings = route.params?.fromSettings || false;
  const [campaignType, setCampaignType] = useState("")
  const [electionDate, setElectionDate] = useState("")
  const [town, setTown] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loadingUserData, setLoadingUserData] = useState(true)
  const [checkingExistingCampaign, setCheckingExistingCampaign] = useState(false)
  const [hasExistingCampaign, setHasExistingCampaign] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ show: false, current: 0, total: 0, message: "" })

  const campaignTypes = [
    "Mayor",
    "City Council",
    "School Board",
    "County Commissioner",
    "State Representative",
    "Other",
  ]

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedUserData) {
          
          const user = JSON.parse(storedUserData);
          setUserData(user);
          setUserId(user.userId);
          setLoadingUserData(false);
          console.log('User data loaded from AsyncStorage:', user);
        } else {
          console.log('No user data found in AsyncStorage');
          setLoadingUserData(false);
          Toast.show({
            type: "error",
            text1: "Authentication Error",
            text2: "Please login again",
          });
          // Navigate back to login if no user data
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setLoadingUserData(false);
        Toast.show({
          type: "error",
          text1: "Storage Error",
          text2: "Failed to load user data",
        });
        navigation.navigate("Login");
      }
    };

    loadUserData();
  }, [navigation]);

  useEffect(() => {
    if (loadingUserData || !userId) {
      return;
    }

    let isMounted = true;

    const checkExistingCampaign = async () => {
      try {
        setCheckingExistingCampaign(true);

        const storedCampaignData = await AsyncStorage.getItem('currentCampaign');
        if (storedCampaignData) {
          if (fromSettings) {
            // If coming from Settings, show message but don't redirect
            if (isMounted) {
              setHasExistingCampaign(true);
            }
          } else {
            // If coming from initial onboarding, redirect to Main
            if (isMounted) {
              navigation.replace("Main");
            }
          }
          return;
        }

        const response = await axios.get(`${BaseUrl}/campaign/get-user-campaigns`, {
          params: { userId },
        });

        if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const campaign = response.data.data[0];
          await AsyncStorage.setItem('currentCampaign', JSON.stringify(campaign));
          if (fromSettings) {
            // If coming from Settings, show message but don't redirect
            if (isMounted) {
              setHasExistingCampaign(true);
            }
          } else {
            // If coming from initial onboarding, redirect to Main
            if (isMounted) {
              navigation.replace("Main");
            }
          }
        }
      } catch (error) {
        console.error("OnboardingScreen: Error checking existing campaign:", error);
        // Allow onboarding flow to proceed if API fails
      } finally {
        if (isMounted) {
          setCheckingExistingCampaign(false);
        }
      }
    };

    checkExistingCampaign();

    return () => {
      isMounted = false;
    };
  }, [loadingUserData, userId, navigation, fromSettings]);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const normalizedType = file.mimeType || inferMimeTypeFromName(file.name);
        setSelectedFile({
          uri: file.uri,
          name: file.name,
          type: normalizedType,
        });
        setErrors(prev => ({ ...prev, file: null }));
        
        Toast.show({
          type: "success",
          text1: "File Selected",
          text2: file.name,
        });
      }
    } catch (err) {
      console.log('Error selecting file:', err);
      Toast.show({
        type: 'error',
        text1: 'File Selection Error',
        text2: 'Failed to select file',
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!userId) {
      newErrors.userId = "User not authenticated"
    }
    
    if (!campaignType) {
      newErrors.campaignType = "Please select a campaign type"
    }
    
    if (!electionDate) {
      newErrors.electionDate = "Please select election date"
    }
    
    if (!town.trim()) {
      newErrors.town = "Please enter town/city"
    }
    
    if (!selectedFile) {
      newErrors.file = "Please upload voter list file"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // API call function
  const handleComplete = async () => {
    // Check if user already has a campaign
    if (hasExistingCampaign) {
      Toast.show({
        type: "error",
        text1: "Campaign Already Exists",
        text2: "You already have a campaign. Each user can only have one campaign at a time.",
      })
      return
    }

    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill all required fields",
      })
      return
    }

    try {
      setLoading(true)
      setUploadProgress({ show: true, current: 0, total: 1000, message: "Uploading file and processing voters..." })

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('type', campaignType)
      formData.append('electionDate', electionDate)
      formData.append('city', town)
      formData.append('userId', userId)
      
      if (selectedFile) {
        formData.append('csvFile', {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.name,
        })
      }

      // Debug: Log the form data
      console.log('Sending FormData with fields:', {
        type: campaignType,
        electionDate,
        city: town,
        userId,
        csvFile: selectedFile ? selectedFile.name : 'No file'
      })

      // Simulate progress updates during upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev.current < prev.total * 0.9) {
            // Estimate progress - increase gradually
            const increment = Math.random() * 50 + 10
            const newCurrent = Math.min(prev.current + increment, prev.total * 0.9)
            const estimatedVoters = Math.floor((newCurrent / prev.total) * 11500)
            return {
              ...prev,
              current: newCurrent,
              message: `Adding voters ${estimatedVoters} of 11500...`
            }
          }
          return prev
        })
      }, 200)

      const response = await axios.post(
        `${BaseUrl}/campaign/create-campaign`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setUploadProgress(prev => ({
                ...prev,
                current: Math.min(percentCompleted * 10, prev.total * 0.3), // Upload is ~30% of total
                message: `Uploading file... ${percentCompleted}%`
              }))
            }
          },
        }
      )

      clearInterval(progressInterval)

      // Update progress to show processing
      setUploadProgress(prev => ({
        ...prev,
        current: prev.total * 0.95,
        message: "Processing voters and geocoding addresses..."
      }))

      if (response.data.success) {
        // Show final progress
        const votersAdded = response.data.votersAdded || 0
        setUploadProgress({
          show: true,
          current: 1000,
          total: 1000,
          message: `Successfully added ${votersAdded} voters!`
        })

        // Wait a moment to show completion
        await new Promise(resolve => setTimeout(resolve, 1000))

        Toast.show({
          type: "success",
          text1: "Campaign Created Successfully!",
          text2: "Your campaign has been set up",
        })
        
        // Store campaign data in AsyncStorage
        try {
          await AsyncStorage.setItem('currentCampaign', JSON.stringify(response.data.campaign));
          console.log('Campaign data stored successfully:', response.data.campaign);
        } catch (storageError) {
          console.error('Error storing campaign data:', storageError);
          Toast.show({
            type: "error",
            text1: "Storage Error",
            text2: "Failed to save campaign data",
          });
        }
        
        // Reset form
        setCampaignType("")
        setElectionDate("")
        setTown("")
        setSelectedFile(null)
        setErrors({})
        setUploadProgress({ show: false, current: 0, total: 0, message: "" })
        
        // Navigate to main screen
        navigation.navigate("Main");
      } else {
        setUploadProgress({ show: false, current: 0, total: 0, message: "" })
        Toast.show({
          type: "error",
          text1: "Campaign Creation Failed",
          text2: response.data.message || "Something went wrong",
        })
      }
    } catch (error) {
      setUploadProgress({ show: false, current: 0, total: 0, message: "" })
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Network error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  // Show loading screen while user data is being loaded
  if (loadingUserData || checkingExistingCampaign) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#931b1bff" />
          <Text style={styles.loadingText}>Loading user data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Campaign Setup</Text>
          <Text style={styles.subtitle}>Let's set up your campaign to get you started</Text>
        </View>

        {hasExistingCampaign && (
          <View style={styles.warningCard}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningTitle}>Campaign Already Exists</Text>
            <Text style={styles.warningText}>
              You already have a campaign. Each user can only have one campaign at a time.
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.section}>
            <Text style={styles.label}>Campaign Type</Text>
            <View style={styles.buttonGrid}>
              {campaignTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    campaignType === type ? styles.typeButtonSelected : styles.typeButtonDefault,
                    hasExistingCampaign && styles.typeButtonDisabled,
                  ]}
                  onPress={() => {
                    if (!hasExistingCampaign) {
                      setCampaignType(type)
                      setErrors(prev => ({ ...prev, campaignType: null }))
                    }
                  }}
                  disabled={hasExistingCampaign}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      campaignType === type ? styles.typeButtonTextSelected : styles.typeButtonTextDefault,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.campaignType && <Text style={styles.errorText}>{errors.campaignType}</Text>}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Election Date</Text>
            <TextInput
              style={[styles.input, hasExistingCampaign && styles.inputDisabled]}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#6B7280"
              value={electionDate}
              onChangeText={(text) => {
                setElectionDate(text)
                setErrors(prev => ({ ...prev, electionDate: null }))
              }}
              editable={!hasExistingCampaign}
            />
            {errors.electionDate && <Text style={styles.errorText}>{errors.electionDate}</Text>}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Town/City</Text>
            <TextInput 
              style={[styles.input, hasExistingCampaign && styles.inputDisabled]} 
              placeholder="Enter your town or city" 
              placeholderTextColor="#6B7280"
              value={town} 
              onChangeText={(text) => {
                setTown(text)
                setErrors(prev => ({ ...prev, town: null }))
              }}
              editable={!hasExistingCampaign}
            />
            {errors.town && <Text style={styles.errorText}>{errors.town}</Text>}
          </View>

          <View style={styles.sectionupload}>
            <Text style={styles.label}>Voter List</Text>
            <TouchableOpacity 
              style={[styles.uploadArea, hasExistingCampaign && styles.uploadAreaDisabled]} 
              onPress={selectFile}
              disabled={hasExistingCampaign}
            >
              <Text style={styles.uploadIcon}>📁</Text>
              <Text style={styles.uploadText}>
                {selectedFile ? selectedFile.name : "Upload CSV or Excel file with voter data"}
              </Text>
              <Text style={styles.uploadButton}>
                {selectedFile ? "Change File" : "Choose File"}
              </Text>
            </TouchableOpacity>
            {errors.file && <Text style={styles.errorText}>{errors.file}</Text>}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.completeButton, (loading || hasExistingCampaign) && { opacity: 0.6 }]} 
          onPress={handleComplete}
          disabled={loading || hasExistingCampaign}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.completeButtonText}>Complete Setup</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Progress Modal */}
      {uploadProgress.show && (
        <Modal
          visible={uploadProgress.show}
          transparent
          animationType="fade"
        >
          <View style={styles.progressModalOverlay}>
            <View style={styles.progressModalContent}>
              <Text style={styles.progressModalTitle}>Creating Campaign</Text>
              <Text style={styles.progressModalMessage}>{uploadProgress.message}</Text>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill,
                      { width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }
                    ]}
                  />
                </View>
              </View>
              
              <Text style={styles.progressPercentage}>
                {Math.round((uploadProgress.current / uploadProgress.total) * 100)}%
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090a0aff", // Dark background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginBottom: 8,
  },
  subtitle: {
    color: "#9CA3AF", // Gray text
    textAlign: "center",
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionupload: {
    marginBottom: 6,
  },
  label: {
    color: "#FFFFFF", // White label
    fontWeight: "500",
    marginBottom: 12,
    fontSize: 16,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  typeButtonDefault: {
    backgroundColor: "transparent", // Transparent default
    borderColor: "#6B7280", // Gray border
  },
  typeButtonSelected: {
    backgroundColor: "#931b1bff", // Red selected
    borderColor: "#931b1bff",
  },
  typeButtonText: {
    fontWeight: "500",
  },
  typeButtonTextDefault: {
    color: "#9CA3AF", // Gray text
  },
  typeButtonTextSelected: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#17181aff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#FFFFFF", // White text
    fontSize: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#6B7280", // Gray dashed border
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#1F2937", // Dark upload background
  },
  uploadIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  uploadText: {
    color: "#9CA3AF", // Gray text
    textAlign: "center",
    marginBottom: 8,
    fontSize: 16,
  },
  uploadButton: {
    color: "#DC2626", // Red upload button
    fontWeight: "500",
    fontSize: 16,
  },
  completeButton: {
    backgroundColor: "#931b1bff", // Red complete button
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  progressModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  progressModalContent: {
    backgroundColor: "#17181aff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#374151",
  },
  progressModalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  progressModalMessage: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#931b1bff",
    borderRadius: 4,
  },
  progressPercentage: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  warningCard: {
    backgroundColor: "#7F1D1D",
    borderWidth: 1,
    borderColor: "#DC2626",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  warningIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  warningTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  warningText: {
    color: "#F9FAFB",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: "#0F172A",
  },
  typeButtonDisabled: {
    opacity: 0.5,
  },
  uploadAreaDisabled: {
    opacity: 0.5,
  },
})


