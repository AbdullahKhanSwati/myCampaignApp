// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function VolunteerScreen({ navigation }) {
//   const [newVolunteerEmail, setNewVolunteerEmail] = useState("")

//   const volunteers = [
//     { id: 1, name: "Sarah Johnson", email: "sarah@email.com", status: "Active", assigned: "Downtown Route A" },
//     { id: 2, name: "Mike Davis", email: "mike@email.com", status: "Active", assigned: "Residential District B" },
//     { id: 3, name: "Lisa Wilson", email: "lisa@email.com", status: "Pending", assigned: "Not Assigned" },
//   ]

//   const handleAddVolunteer = () => {
//     if (newVolunteerEmail) {
//       Alert.alert("Invitation Sent", `An invitation has been sent to ${newVolunteerEmail}`, [{ text: "OK" }])
//       setNewVolunteerEmail("")
//     }
//   }

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Active":
//         return { backgroundColor: "#DCFCE7", color: "#16A34A" }
//       case "Pending":
//         return { backgroundColor: "#FEF3C7", color: "#D97706" }
//       case "Inactive":
//         return { backgroundColor: "#F3F4F6", color: "#6B7280" }
//       default:
//         return { backgroundColor: "#F3F4F6", color: "#6B7280" }
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Team Management</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.subscriptionNotice}>
//           <Text style={styles.subscriptionTitle}>💼 Team Access</Text>
//           <Text style={styles.subscriptionText}>
//             Add volunteers to help with your campaign. Each additional user requires a separate subscription.
//           </Text>
//           <TouchableOpacity style={styles.upgradeButton}>
//             <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Add New Volunteer</Text>

//           <View style={styles.inputContainer}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Email Address</Text>
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="volunteer@email.com"
//                 value={newVolunteerEmail}
//                 onChangeText={setNewVolunteerEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <TouchableOpacity style={styles.inviteButton} onPress={handleAddVolunteer}>
//               <Text style={styles.inviteButtonText}>Send Invitation</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Current Team Members</Text>

//           {volunteers.map((volunteer, index) => (
//             <View
//               key={volunteer.id}
//               style={[styles.volunteerItem, index === volunteers.length - 1 && styles.lastVolunteerItem]}
//             >
//               <View style={styles.volunteerHeader}>
//                 <View style={styles.volunteerInfo}>
//                   <Text style={styles.volunteerName}>{volunteer.name}</Text>
//                   <Text style={styles.volunteerEmail}>{volunteer.email}</Text>
//                   <Text style={styles.volunteerAssigned}>Assigned: {volunteer.assigned}</Text>
//                 </View>
//                 <View style={[styles.statusBadge, getStatusStyle(volunteer.status)]}>
//                   <Text style={[styles.statusText, { color: getStatusStyle(volunteer.status).color }]}>
//                     {volunteer.status}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.volunteerActions}>
//                 <TouchableOpacity style={[styles.actionButton, styles.assignButton]}>
//                   <Text style={styles.actionButtonText}>Assign Route</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.actionButton, styles.progressButton]}>
//                   <Text style={styles.actionButtonText}>View Progress</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.actionButton, styles.removeButton]}>
//                   <Text style={styles.actionButtonText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>

//         <View style={styles.permissionsInfo}>
//           <Text style={styles.permissionsTitle}>🔒 Volunteer Permissions</Text>
//           <Text style={styles.permissionsText}>
//             Volunteers have limited access and can only:{"\n"}• View assigned walk lists{"\n"}• Update voter responses
//             {"\n"}• Add notes to voter records{"\n"}• View their assigned objectives{"\n\n"}
//             They cannot access campaign analytics, settings, or other team members' data.
//           </Text>
//         </View>
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
//   subscriptionNotice: {
//     backgroundColor: "#EFF6FF",
//     borderWidth: 1,
//     borderColor: "#BFDBFE",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//   },
//   subscriptionTitle: {
//     color: "#1E40AF",
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   subscriptionText: {
//     color: "#1D4ED8",
//     fontSize: 14,
//     marginBottom: 12,
//   },
//   upgradeButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignSelf: "flex-start",
//   },
//   upgradeButtonText: {
//     color: "#FFFFFF",
//     fontWeight: "500",
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
//   inviteButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   inviteButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   volunteerItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//     paddingBottom: 16,
//     marginBottom: 16,
//   },
//   lastVolunteerItem: {
//     borderBottomWidth: 0,
//     marginBottom: 0,
//   },
//   volunteerHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   volunteerInfo: {
//     flex: 1,
//   },
//   volunteerName: {
//     fontSize: 18,
//     fontWeight: "500",
//     color: "#1F2937",
//   },
//   volunteerEmail: {
//     color: "#6B7280",
//     marginTop: 2,
//   },
//   volunteerAssigned: {
//     color: "#6B7280",
//     marginTop: 2,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   statusText: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   volunteerActions: {
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 12,
//   },
//   actionButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   assignButton: {
//     backgroundColor: "#3B82F6",
//     flex: 1,
//   },
//   progressButton: {
//     backgroundColor: "#6B7280",
//     flex: 1,
//   },
//   removeButton: {
//     backgroundColor: "#DC2626",
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   permissionsInfo: {
//     backgroundColor: "#FFFBEB",
//     borderWidth: 1,
//     borderColor: "#FDE68A",
//     borderRadius: 8,
//     padding: 16,
//   },
//   permissionsTitle: {
//     color: "#92400E",
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   permissionsText: {
//     color: "#B45309",
//     fontSize: 14,
//   },
// })





"use client"

import { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import BaseUrl from "../../BaseUrl"
import { useFocusEffect } from "@react-navigation/native"

export default function VolunteerScreen({ navigation }) {
  const [newVolunteerEmail, setNewVolunteerEmail] = useState("")
  const [routes, setRoutes] = useState([])
  const [selectedRouteIds, setSelectedRouteIds] = useState([])
  const [showRouteModal, setShowRouteModal] = useState(false)
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const [volunteers, setVolunteers] = useState([])
  const [isLoadingVolunteers, setIsLoadingVolunteers] = useState(false)
  const [campaignId, setCampaignId] = useState(null)
  const [isVolunteer, setIsVolunteer] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedCampaign = await AsyncStorage.getItem("currentCampaign")
        const volunteerStatus = await AsyncStorage.getItem("isVolunteer")
        
        // User is volunteer if: marked as volunteer AND has no campaign
        const userIsVolunteer = volunteerStatus === "true" && !storedCampaign
        setIsVolunteer(userIsVolunteer)
        
        if (storedCampaign) {
          const campaign = JSON.parse(storedCampaign)
          setCampaignId(campaign._id)
        }
      } catch (error) {
        console.error("Error initializing:", error)
      }
    }
    initialize()
  }, [])

  const fetchRoutes = useCallback(async () => {
    if (!campaignId) return
    try {
      setIsLoadingRoutes(true)
      const response = await axios.get(`${BaseUrl}/canvassing`, {
        params: { campaignId },
      })
      if (response.data?.success) {
        setRoutes(Array.isArray(response.data.data) ? response.data.data : [])
      }
    } catch (error) {
      console.error("Error fetching routes:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load routes",
      })
    } finally {
      setIsLoadingRoutes(false)
    }
  }, [campaignId])

  const fetchVolunteers = useCallback(async () => {
    if (!campaignId) return
    try {
      setIsLoadingVolunteers(true)
      // Get current user ID to filter volunteers assigned by this user
      const userData = await AsyncStorage.getItem("userData")
      const user = userData ? JSON.parse(userData) : null
      const userId = user?.userId || user?._id
      
      const response = await axios.get(`${BaseUrl}/volunteer/campaign-volunteers`, {
        params: { 
          campaignId,
          userId // Filter by user who assigned them
        },
      })
      if (response.data?.success) {
        setVolunteers(response.data.data || [])
      }
    } catch (error) {
      console.error("Error fetching volunteers:", error)
    } finally {
      setIsLoadingVolunteers(false)
    }
  }, [campaignId])

  useFocusEffect(
    useCallback(() => {
      fetchRoutes()
      fetchVolunteers()
    }, [fetchRoutes, fetchVolunteers])
  )

  const handleToggleRoute = (routeId) => {
    setSelectedRouteIds((prev) => {
      if (prev.includes(routeId)) {
        return prev.filter((id) => id !== routeId)
      } else {
        return [...prev, routeId]
      }
    })
  }

  const handleAssignRoutes = async () => {
    if (!newVolunteerEmail.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter volunteer email",
      })
      return
    }

    if (selectedRouteIds.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select at least one route",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newVolunteerEmail)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email address",
      })
      return
    }

    try {
      setIsAssigning(true)
      const userData = await AsyncStorage.getItem("userData")
      const user = userData ? JSON.parse(userData) : null

      const response = await axios.post(`${BaseUrl}/volunteer/assign`, {
        volunteerEmail: newVolunteerEmail.trim(),
        routeIds: selectedRouteIds,
        campaignId,
        assignedBy: user?.userId,
      })

      if (response.data?.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: `Routes assigned to ${newVolunteerEmail}`,
        })
        setNewVolunteerEmail("")
        setSelectedRouteIds([])
        setShowRouteModal(false)
        fetchVolunteers()
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data?.message || "Failed to assign routes",
        })
      }
    } catch (error) {
      console.error("Error assigning routes:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Network error occurred",
      })
    } finally {
      setIsAssigning(false)
    }
  }

  const handleAddVolunteer = () => {
    if (!campaignId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No campaign selected",
      })
      return
    }
    setShowRouteModal(true)
    setSelectedRouteIds([])
  }

  // If user is a volunteer (no campaign), show access denied message
  if (isVolunteer) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Team Management</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <View style={styles.accessDeniedContainer}>
              <Text style={styles.accessDeniedIcon}>🚫</Text>
              <Text style={styles.accessDeniedTitle}>Access Restricted</Text>
              <Text style={styles.accessDeniedText}>
                Volunteers cannot assign other volunteers. This feature is only available to campaign managers.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Team Management</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.subscriptionNotice}>
          <Text style={styles.subscriptionTitle}>💼 Team Access</Text>
          <Text style={styles.subscriptionText}>
            Add volunteers to help with your campaign. Assign routes to volunteers so they can access specific voter data.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add New Volunteer</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="volunteer@email.com"
                placeholderTextColor="#6B7280"
                value={newVolunteerEmail}
                onChangeText={setNewVolunteerEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.inviteButton} onPress={handleAddVolunteer}>
              <Text style={styles.inviteButtonText}>Select Routes & Assign</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Current Team Members</Text>

          {isLoadingVolunteers ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#931b1bff" />
              <Text style={styles.loadingText}>Loading volunteers...</Text>
            </View>
          ) : volunteers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No volunteers assigned yet</Text>
            </View>
          ) : (
            volunteers.map((volunteer, index) => (
              <View
                key={volunteer.email || index}
                style={[styles.volunteerItem, index === volunteers.length - 1 && styles.lastVolunteerItem]}
              >
                <View style={styles.volunteerHeader}>
                  <View style={styles.volunteerInfo}>
                    <Text style={styles.volunteerEmail}>{volunteer.email}</Text>
                    <Text style={styles.volunteerAssigned}>
                      Assigned Routes: {volunteer.routes?.length || 0}
                    </Text>
                    {volunteer.routes && volunteer.routes.length > 0 && (
                      <View style={styles.routesList}>
                        {volunteer.routes.map((route, idx) => (
                          <Text key={route._id || idx} style={styles.routeTag}>
                            {route.routeName}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.permissionsInfo}>
          <Text style={styles.permissionsTitle}>🔒 Volunteer Permissions</Text>
          <Text style={styles.permissionsText}>
            Volunteers have limited access and can only:{"\n"}• View assigned walk lists{"\n"}• Update voter responses
            {"\n"}• Add notes to voter records{"\n"}• View their assigned objectives{"\n\n"}
            They cannot access campaign analytics, settings, or other team members' data.
          </Text>
        </View>
      </ScrollView>

      {/* Route Selection Modal */}
      <Modal
        visible={showRouteModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRouteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Routes to Assign</Text>
              <TouchableOpacity onPress={() => setShowRouteModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Volunteer: {newVolunteerEmail || "N/A"}
            </Text>

            {isLoadingRoutes ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="large" color="#931b1bff" />
                <Text style={styles.loadingText}>Loading routes...</Text>
              </View>
            ) : routes.length === 0 ? (
              <View style={styles.modalEmpty}>
                <Text style={styles.emptyText}>No routes available</Text>
                <Text style={styles.emptySubtext}>Create routes first in the Canvassing screen</Text>
              </View>
            ) : (
              <ScrollView style={styles.modalScrollView}>
                {routes.map((route) => {
                  const isSelected = selectedRouteIds.includes(route._id)
                  return (
                    <TouchableOpacity
                      key={route._id}
                      style={[
                        styles.routeOption,
                        isSelected && styles.routeOptionSelected,
                      ]}
                      onPress={() => handleToggleRoute(route._id)}
                    >
                      <View style={styles.routeOptionContent}>
                        <Text style={styles.routeOptionName}>{route.routeName}</Text>
                        <Text style={styles.routeOptionDetails}>
                          {route.totalVoters || 0} voters • {route.status || "Not Started"}
                        </Text>
                      </View>
                      {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowRouteModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonAssign,
                  (isAssigning || selectedRouteIds.length === 0) && styles.modalButtonDisabled,
                ]}
                onPress={handleAssignRoutes}
                disabled={isAssigning || selectedRouteIds.length === 0}
              >
                {isAssigning ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalButtonText}>
                    Assign ({selectedRouteIds.length})
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: "#eeeeeeff", // Red back button
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  subscriptionNotice: {
    backgroundColor: "#1F2937", // Dark notice background
    borderWidth: 1,
    borderColor: "#931b1bff", // Red border
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  subscriptionTitle: {
    color: "#931b1bff", // Red title
    fontWeight: "600",
    marginBottom: 8,
  },
  subscriptionText: {
    color: "#FFFFFF", // White text
    fontSize: 14,
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  upgradeButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#1F2937", // Dark card
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#374151", // Dark border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF", // White text
    marginBottom: 16,
  },
  inputContainer: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#FFFFFF", // White label
    fontWeight: "500",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#374151", // Dark border
    backgroundColor: "#bfc0c2ff", // Dark input background
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,

  },
  inviteButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 12,
    borderRadius: 8,
  },
  inviteButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  volunteerItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151", // Dark border
    paddingBottom: 16,
    marginBottom: 16,
  },
  lastVolunteerItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  volunteerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF", // White text
  },
  volunteerEmail: {
    color: "#9CA3AF", // Gray text
    marginTop: 2,
  },
  volunteerAssigned: {
    color: "#9CA3AF", // Gray text
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  volunteerActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  assignButton: {
    backgroundColor: "#931b1bff", // Red assign button
    flex: 1,
  },
  progressButton: {
    backgroundColor: "#6B7280",
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#991B1B", // Darker red remove button
  },
  actionButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: 500,
  },
  permissionsInfo: {
    backgroundColor: "#1F2937", // Dark permissions background
    borderWidth: 1,
    borderColor: "#CA8A04", // Yellow border
    borderRadius: 8,
    padding: 16,
     marginBottom:50
  },
  permissionsTitle: {
    color: "#FCD34D", // Yellow title
    fontWeight: "600",
    marginBottom: 8,
  },
  permissionsText: {
    color: "#FFFFFF", // White text
    fontSize: 14
   
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: "#9CA3AF",
    marginTop: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  routesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  routeTag: {
    backgroundColor: "#374151",
    color: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1F2937",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  modalClose: {
    fontSize: 24,
    color: "#9CA3AF",
  },
  modalSubtitle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#9CA3AF",
    fontSize: 14,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  routeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: "#111827",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#374151",
  },
  routeOptionSelected: {
    borderColor: "#931b1bff",
    backgroundColor: "#1F2937",
  },
  routeOptionContent: {
    flex: 1,
  },
  routeOptionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  routeOptionDetails: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  checkmark: {
    fontSize: 20,
    color: "#931b1bff",
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#374151",
  },
  modalButtonAssign: {
    backgroundColor: "#931b1bff",
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalLoading: {
    padding: 40,
    alignItems: "center",
  },
  modalEmpty: {
    padding: 40,
    alignItems: "center",
  },
  emptySubtext: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  accessDeniedContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  accessDeniedIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  accessDeniedTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  accessDeniedText: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
})
