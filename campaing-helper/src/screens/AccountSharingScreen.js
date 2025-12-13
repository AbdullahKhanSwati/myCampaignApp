"use client"

import { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import BaseUrl from "../../BaseUrl"
import { useFocusEffect } from "@react-navigation/native"

export default function AccountSharingScreen({ navigation }) {
  const [assignedRoutes, setAssignedRoutes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRouteId, setSelectedRouteId] = useState(null)

  const fetchAssignedRoutes = useCallback(async () => {
    try {
      setIsLoading(true)
      const userData = await AsyncStorage.getItem("userData")
      if (!userData) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User data not found",
        })
        return
      }

      const { email } = JSON.parse(userData)
      const response = await axios.get(`${BaseUrl}/volunteer/assigned-routes`, {
        params: { email },
      })

      if (response.data?.success) {
        setAssignedRoutes(response.data.data || [])
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data?.message || "Failed to fetch assigned routes",
        })
      }
    } catch (error) {
      console.error("Error fetching assigned routes:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Network error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchAssignedRoutes()
    }, [fetchAssignedRoutes])
  )

  const handleSelectRoute = async (route) => {
    try {
      // Store selected route in AsyncStorage for filtering
      await AsyncStorage.setItem("selectedVolunteerRoute", JSON.stringify({
        routeId: route.routeId._id,
        routeName: route.routeId.routeName,
        campaignId: route.campaignId._id,
      }))
      
      // Update route selection state
      await AsyncStorage.setItem("hasSelectedRoute", "true")
      
      setSelectedRouteId(route.routeId._id)
      
      Toast.show({
        type: "success",
        text1: "Route Selected",
        text2: `Viewing data for ${route.routeId.routeName}`,
      })

      // Navigate to Dashboard to show filtered data
      navigation.navigate("Dashboard")
    } catch (error) {
      console.error("Error selecting route:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to select route",
      })
    }
  }

  const handleClearSelection = async () => {
    await AsyncStorage.removeItem("selectedVolunteerRoute")
    await AsyncStorage.setItem("hasSelectedRoute", "false")
    setSelectedRouteId(null)
    Toast.show({
      type: "info",
      text1: "Selection Cleared",
      text2: "Showing all assigned routes",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#22C55E"
      case "In Progress":
        return "#3B82F6"
      default:
        return "#6B7280"
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account Sharing</Text>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#931b1bff" />
          <Text style={styles.loadingText}>Loading assigned routes...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Sharing</Text>
        </View>
        {selectedRouteId && (
          <TouchableOpacity onPress={handleClearSelection} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Selection</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {assignedRoutes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No Routes Assigned</Text>
            <Text style={styles.emptyText}>
              You don't have any routes assigned yet. Contact your campaign manager to get started.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Assigned Routes</Text>
            {assignedRoutes.map((assignment, index) => {
              const route = assignment.routeId
              const campaign = assignment.campaignId
              const isSelected = selectedRouteId === route?._id

              if (!route) return null

              return (
                <TouchableOpacity
                  key={assignment._id || index}
                  style={[
                    styles.routeCard,
                    isSelected && styles.selectedRouteCard,
                  ]}
                  onPress={() => handleSelectRoute(assignment)}
                >
                  <View style={styles.routeHeader}>
                    <View style={styles.routeInfo}>
                      <Text style={styles.routeName}>{route.routeName}</Text>
                      {campaign && (
                        <Text style={styles.campaignInfo}>
                          Campaign: {campaign.type || "N/A"} - {campaign.city || "N/A"}
                        </Text>
                      )}
                      <Text style={styles.routeDetails}>
                        {route.totalVoters || 0} voters • Progress: {route.progress || 0}%
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(route.status) + "20" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(route.status) },
                        ]}
                      >
                        {route.status || "Not Started"}
                      </Text>
                    </View>
                  </View>

                  {assignment.assignedBy && (
                    <Text style={styles.assignedBy}>
                      Assigned by: {assignment.assignedBy.name || assignment.assignedBy.email}
                    </Text>
                  )}

                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>✓ Currently Selected</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </>
        )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: "#e3d8d8ff",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  clearButton: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  selectedRouteCard: {
    borderColor: "#931b1bff",
    borderWidth: 2,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  campaignInfo: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  routeDetails: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  assignedBy: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    fontStyle: "italic",
  },
  selectedIndicator: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  selectedText: {
    color: "#931b1bff",
    fontWeight: "600",
    fontSize: 14,
  },
})


