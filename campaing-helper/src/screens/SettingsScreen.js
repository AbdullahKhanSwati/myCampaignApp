// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function SettingsScreen({ navigation }) {
//   const [name, setName] = useState("John Candidate")
//   const [email, setEmail] = useState("john@campaign.com")
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   const handleUpdateProfile = () => {
//     Alert.alert("Success", "Profile updated successfully!")
//   }

//   const handleChangePassword = () => {
//     if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "New passwords do not match")
//       return
//     }
//     Alert.alert("Success", "Password changed successfully!")
//     setCurrentPassword("")
//     setNewPassword("")
//     setConfirmPassword("")
//   }

//   const handleLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Logout", onPress: () => navigation.navigate("Splash") },
//     ])
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Settings</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Profile Information</Text>

//           <View style={styles.inputContainer}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder="Your full name" />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Email Address</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Your email address"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
//               <Text style={styles.updateButtonText}>Update Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Change Password</Text>

//           <View style={styles.inputContainer}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Current Password</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={currentPassword}
//                 onChangeText={setCurrentPassword}
//                 placeholder="Enter current password"
//                 secureTextEntry
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>New Password</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 placeholder="Enter new password"
//                 secureTextEntry
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Confirm New Password</Text>
//               <TextInput
//                 style={styles.textInput}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 placeholder="Confirm new password"
//                 secureTextEntry
//               />
//             </View>

//             <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
//               <Text style={styles.changePasswordButtonText}>Change Password</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Subscription</Text>

//           <View style={styles.subscriptionInfo}>
//             <Text style={styles.subscriptionTitle}>Monthly Plan - Active</Text>
//             <Text style={styles.subscriptionDetail}>Next billing: February 15, 2024</Text>
//             <Text style={styles.subscriptionDetail}>$49.00/month</Text>
//           </View>

//           <View style={styles.subscriptionButtons}>
//             <TouchableOpacity style={[styles.subscriptionButton, styles.upgradeButton]}>
//               <Text style={styles.subscriptionButtonText}>Upgrade Plan</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.subscriptionButton, styles.billingButton]}>
//               <Text style={styles.subscriptionButtonText}>Billing History</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.cancelButton}>
//             <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>App Settings</Text>

//           <View style={styles.settingsContainer}>
//             <TouchableOpacity style={styles.settingItem}>
//               <Text style={styles.settingText}>Push Notifications</Text>
//               <Text style={styles.settingValue}>On</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.settingItem}>
//               <Text style={styles.settingText}>Email Notifications</Text>
//               <Text style={styles.settingValue}>On</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.settingItem}>
//               <Text style={styles.settingText}>Data Export</Text>
//               <Text style={styles.settingValue}>Export</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Support</Text>

//           <View style={styles.supportContainer}>
//             <TouchableOpacity style={styles.supportItem}>
//               <Text style={styles.supportText}>Help Center</Text>
//               <Text style={styles.supportArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.supportItem}>
//               <Text style={styles.supportText}>Contact Support</Text>
//               <Text style={styles.supportArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.supportItem}>
//               <Text style={styles.supportText}>Privacy Policy</Text>
//               <Text style={styles.supportArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.supportItem}>
//               <Text style={styles.supportText}>Terms of Service</Text>
//               <Text style={styles.supportArrow}>›</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   header: {
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },
//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   backButton: {
//     color: "#3B82F6",
//     fontSize: 18,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginLeft: 16,
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingVertical: 24,
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 16,
//   },
//   inputContainer: {
//     gap: 16,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     color: "#374151",
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     color: "#1F2937",
//     fontSize: 16,
//   },
//   updateButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   updateButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   changePasswordButton: {
//     backgroundColor: "#16A34A",
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   changePasswordButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   subscriptionInfo: {
//     backgroundColor: "#F0FDF4",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   subscriptionTitle: {
//     color: "#166534",
//     fontWeight: "500",
//     marginBottom: 4,
//   },
//   subscriptionDetail: {
//     color: "#15803D",
//     fontSize: 14,
//   },
//   subscriptionButtons: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   subscriptionButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     flex: 1,
//   },
//   upgradeButton: {
//     backgroundColor: "#3B82F6",
//   },
//   billingButton: {
//     backgroundColor: "#6B7280",
//   },
//   subscriptionButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   cancelButton: {
//     backgroundColor: "#DC2626",
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 12,
//   },
//   cancelButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   settingsContainer: {
//     gap: 16,
//   },
//   settingItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   settingText: {
//     color: "#1F2937",
//   },
//   settingValue: {
//     color: "#3B82F6",
//   },
//   supportContainer: {
//     gap: 12,
//   },
//   supportItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   supportText: {
//     color: "#1F2937",
//   },
//   supportArrow: {
//     color: "#9CA3AF",
//   },
//   logoutButton: {
//     backgroundColor: "#DC2626",
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 32,
//   },
//   logoutButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// })






"use client"

import { useState, useEffect } from "react"
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Toast from "react-native-toast-message"
import BaseUrl from "../../BaseUrl.js"

export default function SettingsScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const userData = await AsyncStorage.getItem('userData')
      if (userData) {
        const parsedUserData = JSON.parse(userData)
        setName(parsedUserData.user?.name || "")
        setEmail(parsedUserData.user?.email || "")
        setToken(parsedUserData.token || null)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load user data",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All password fields are required",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "New passwords do not match",
      })
      return
    }

    if (newPassword.length < 6) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "New password must be at least 6 characters long",
      })
      return
    }

    if (!token) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Authentication required. Please login again.",
      })
      return
    }

    try {
      setPasswordLoading(true)
      const response = await axios.post(
        `${BaseUrl}/user/update-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password updated successfully!",
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message || "Failed to update password",
        })
      }
    } catch (error) {
      console.error("Password update error:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to update password. Please try again.",
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        onPress: async () => {
          try {
            // Get user data to send token if available
            const userData = await AsyncStorage.getItem('userData');
            let token = null;
            
            if (userData) {
              try {
                const parsedUserData = JSON.parse(userData);
                token = parsedUserData.token;
              } catch (e) {
                console.error('Error parsing userData:', e);
              }
            }

            // Call logout API
            try {
              await axios.post(
                `${BaseUrl}/user/logout`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                  },
                }
              );
            } catch (apiError) {
              // Even if API call fails, proceed with local logout
              console.error("Logout API error:", apiError);
            }

            // Clear all AsyncStorage data
            await AsyncStorage.multiRemove([
              'userData',
              'currentCampaign',
              'userCampaigns',
              'isVolunteer',
              'selectedVolunteerRoute',
            ]);

            // Clear all AsyncStorage keys (fallback to ensure everything is cleared)
            try {
              const allKeys = await AsyncStorage.getAllKeys();
              await AsyncStorage.multiRemove(allKeys);
            } catch (clearError) {
              console.error("Error clearing all AsyncStorage:", clearError);
            }

            Toast.show({
              type: "success",
              text1: "Logged Out",
              text2: "You have been successfully logged out",
            });

            // Navigate to Splash/Login screen
            navigation.reset({
              index: 0,
              routes: [{ name: "Splash" }],
            });
          } catch (error) {
            console.error("Logout error:", error);
            Toast.show({
              type: "error",
              text1: "Logout Error",
              text2: "An error occurred during logout. Please try again.",
            });
          }
        }
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.sectionTitle}>Profile Information</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#931b1bff" />
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.readOnlyInput}>
                  <Text style={styles.readOnlyText}>{name || "Loading..."}</Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.readOnlyInput}>
                  <Text style={styles.readOnlyText}>{email || "Loading..."}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🔒</Text>
            <Text style={styles.sectionTitle}>Change Password</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput
                style={styles.textInput}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor="#6B7280"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                style={styles.textInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#6B7280"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#6B7280"
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={[styles.changePasswordButton, passwordLoading && styles.disabledButton]} 
              onPress={handleChangePassword}
              disabled={passwordLoading}
            >
              {passwordLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.changePasswordButtonText}>🔑 Change Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💎</Text>
            <Text style={styles.sectionTitle}>Subscription</Text>
          </View>

          <View style={styles.subscriptionInfo}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionTitle}>Monthly Plan</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            </View>
            <Text style={styles.subscriptionDetail}>💳 Next billing: February 15, 2024</Text>
            <Text style={styles.subscriptionDetail}>💰 $49.00/month</Text>
          </View>

          <View style={styles.subscriptionButtons}>
            <TouchableOpacity style={[styles.subscriptionButton, styles.upgradeButton]}>
              <Text style={styles.subscriptionButtonText}>⬆️ Upgrade Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subscriptionButton, styles.billingButton]}>
              <Text style={styles.subscriptionButtonText}>📄 Billing History</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>❌ Cancel Subscription</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⚙️</Text>
            <Text style={styles.sectionTitle}>App Settings</Text>
          </View>

          <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <View style={styles.toggleOn}>
                <Text style={styles.settingValue}>ON</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📧</Text>
                <Text style={styles.settingText}>Email Notifications</Text>
              </View>
              <View style={styles.toggleOn}>
                <Text style={styles.settingValue}>ON</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📊</Text>
                <Text style={styles.settingText}>Data Export</Text>
              </View>
              <View style={styles.exportButton}>
                <Text style={styles.exportButtonText}>Export</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🗳️</Text>
            <Text style={styles.sectionTitle}>Campaign</Text>
          </View>

          <View style={styles.supportContainer}>
            <TouchableOpacity 
              style={styles.supportItem}
              onPress={() => navigation.navigate("Onboarding", { fromSettings: true })}
            >
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>➕</Text>
                <Text style={styles.supportText}>Create Campaign</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🆘</Text>
            <Text style={styles.sectionTitle}>Support</Text>
          </View>

          <View style={styles.supportContainer}>
            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>❓</Text>
                <Text style={styles.supportText}>Help Center</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>💬</Text>
                <Text style={styles.supportText}>Contact Support</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>🔐</Text>
                <Text style={styles.supportText}>Privacy Policy</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>📋</Text>
                <Text style={styles.supportText}>Terms of Service</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
  },
  header: {
    backgroundColor: "#1F2937", // Dark header
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151", // Dark border
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    color: "#e3d8d8ff", // Red accent
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB", // Light text
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  card: {
    backgroundColor: "#1F2937", // Dark card background
    borderRadius: 12, // More rounded corners
    padding: 20, // More padding
    marginBottom: 24,
    borderWidth: 1, // Added border
    borderColor: "#374151", // Dark border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Enhanced shadow
    },
    shadowOpacity: 0.3, // Stronger shadow
    shadowRadius: 8, // Larger shadow radius
    elevation: 8, // Enhanced elevation
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F9FAFB", // Light text
  },
  inputContainer: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#D1D5DB", // Light gray text
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#4B5563", // Dark border
    backgroundColor: "#374151", // Dark input background
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#F9FAFB", // Light text
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 14, // More padding
    borderRadius: 8,
    shadowColor: "#931b1bff", // Red shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  updateButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600", // Bolder text
    fontSize: 16, // Larger text
  },
  changePasswordButton: {
    backgroundColor: "#931b1bff", // Red instead of green
    paddingVertical: 14, // More padding
    borderRadius: 8,
    shadowColor: "#931b1bff", // Red shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  changePasswordButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600", // Bolder text
    fontSize: 16, // Larger text
  },
  subscriptionInfo: {
    backgroundColor: "#1F2937", // Dark background
    borderWidth: 2, // Thicker border
    borderColor: "#931b1bff", // Red border
    borderRadius: 12, // More rounded
    padding: 20, // More padding
    marginBottom: 16,
  },
  subscriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subscriptionTitle: {
    color: "#F9FAFB", // Light text
    fontWeight: "600", // Bolder
    fontSize: 16, // Larger
  },
  activeBadge: {
    backgroundColor: "#931b1bff", // Red badge
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  subscriptionDetail: {
    color: "#D1D5DB", // Light gray text
    fontSize: 14,
    marginBottom: 4, // Added margin
  },
  subscriptionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  subscriptionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    shadowColor: "#000", // Added shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  upgradeButton: {
    backgroundColor: "#931b1bff", // Red button
  },
  billingButton: {
    backgroundColor: "#374151", // Dark gray button
  },
  subscriptionButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#7F1D1D", // Dark red button
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1, // Added border
    borderColor: "#931b1bff", // Red border
  },
  cancelButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  settingsContainer: {
    gap: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // More padding
    paddingHorizontal: 16, // Added horizontal padding
    backgroundColor: "#374151", // Dark background
    borderRadius: 8, // Rounded corners
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingText: {
    color: "#F9FAFB", // Light text
    fontSize: 16, // Larger text
  },
  toggleOn: {
    backgroundColor: "#931b1bff", // Red toggle
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  settingValue: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
  exportButton: {
    backgroundColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#931b1bff",
  },
  exportButtonText: {
    color: "#931b1bff",
    fontWeight: "600",
    fontSize: 12,
  },
  supportContainer: {
    gap: 12,
  },
  supportItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // More padding
    paddingHorizontal: 16, // Added horizontal padding
    backgroundColor: "#374151", // Dark background
    borderRadius: 8, // Rounded corners
  },
  supportLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  supportText: {
    color: "#F9FAFB", // Light text
    fontSize: 16, // Larger text
  },
  supportArrow: {
    color: "#DC2626", // Red arrow
    fontSize: 20, // Larger arrow
    fontWeight: "bold", // Bolder arrow
  },
  logoutButton: {
    backgroundColor: "#7F1D1D", // Dark red background
    paddingVertical: 18, // More padding
    borderRadius: 12, // More rounded
    marginBottom: 32,
    borderWidth: 2, // Added border
    borderColor: "#DC2626", // Red border
    shadowColor: "#DC2626", // Red shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: "#4B5563",
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    justifyContent: "center",
  },
  readOnlyText: {
    color: "#D1D5DB",
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
})
