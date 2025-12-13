"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import MapView, { Callout, Marker, Polygon } from "react-native-maps"
import Toast from "react-native-toast-message"
import * as Location from "expo-location"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import BaseUrl from "../../BaseUrl"
import { useFocusEffect } from "@react-navigation/native"

const STATUS_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Moved", value: "moved" },
  { label: "Undecided", value: "undecided" }
]

const formatStatusLabel = (status) => {
  if (!status) return "Undecided"
  const normalized = status.toLowerCase()
  const match = STATUS_OPTIONS.find((option) => option.value === normalized)
  return match ? match.label : status
}

const getMarkerColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "yes":
      return "#22C55E"
    case "no":
      return "#EF4444"
    case "moved":
      return "#6B7280"
    case "undecided":
    default:
      return "#F59E0B"
  }
}

export default function RouteMapScreen({ route, navigation }) {
  const { routeId, routeName, boundary, voters: initialVoters = [] } = route.params || {}

  const [campaignId, setCampaignId] = useState(route.params?.campaignId || null)
  const [isLoading, setIsLoading] = useState(!initialVoters.length)
  const [voters, setVoters] = useState(initialVoters)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [trackingActive, setTrackingActive] = useState(false)
  const [locationWatcher, setLocationWatcher] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [showListView, setShowListView] = useState(true) // Default to list view to show voters

  const mapRef = useRef(null)
  const markerRefs = useRef({})

  const polygonCoordinates = useMemo(() => {
    if (!boundary || !Array.isArray(boundary.coordinates)) {
      return []
    }
    const coordinates = boundary.coordinates[0] || []
    return coordinates
      .filter((point) => Array.isArray(point) && point.length === 2)
      .map(([lng, lat]) => ({
        latitude: lat,
        longitude: lng
      }))
  }, [boundary])

  const filteredVoters = useMemo(() => {
    if (!searchQuery.trim()) {
      return voters
    }
    const normalized = searchQuery.trim().toLowerCase()
    return voters.filter((voter) => {
      const fullName = `${voter.firstName || ""} ${voter.lastName || ""}`.toLowerCase()
      const addressLine = [
        voter.streetNo || "",
        voter.streetName || "",
        voter.residenceCity || "",
        voter.residenceState || ""
      ]
        .join(" ")
        .toLowerCase()
      return fullName.includes(normalized) || addressLine.includes(normalized)
    })
  }, [searchQuery, voters])

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  useEffect(() => {
    let isMounted = true
    const ensureCampaignId = async () => {
      if (campaignId) {
        return
      }
      try {
        const storedCampaign = await AsyncStorage.getItem("currentCampaign")
        if (storedCampaign) {
          const parsed = JSON.parse(storedCampaign)
          if (isMounted) {
            setCampaignId(parsed._id)
          }
        }
      } catch (error) {
        console.error("RouteMapScreen: failed to load campaignId:", error)
      }
    }
    ensureCampaignId()
    return () => {
      isMounted = false
    }
  }, [campaignId])

  useEffect(() => {
    let isMounted = true
    const fetchRouteVoters = async () => {
      if (!routeId || initialVoters.length) {
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const response = await axios.get(`${BaseUrl}/canvassing/${routeId}`)
        if (response.data?.success) {
          const loadedVoters = Array.isArray(response.data.data?.voters) ? response.data.data.voters : []
          if (isMounted) {
            setVoters(loadedVoters)
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Route Load Failed",
            text2: response.data?.message || "Unable to load voters for this route."
          })
        }
      } catch (error) {
        console.error("RouteMapScreen: error fetching route voters:", error)
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: error.response?.data?.message || "Unable to fetch route information."
        })
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    fetchRouteVoters()
    return () => {
      isMounted = false
    }
  }, [initialVoters.length, routeId])

  useEffect(() => {
    let isMounted = true
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          Toast.show({
            type: "info",
            text1: "Location Permission",
            text2: "Grant location access to center the map near you."
          })
          return
        }
        const currentLocation = await Location.getCurrentPositionAsync({})
        if (isMounted) {
          setUserLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
          })
        }
      } catch (error) {
        console.error("RouteMapScreen: location permission error:", error)
      }
    }
    requestLocationPermission()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (locationWatcher) {
        locationWatcher.remove()
      }
    }
  }, [locationWatcher])

  useEffect(() => {
    if (filteredVoters.length === 0 && polygonCoordinates.length === 0) {
      return
    }
    const timeout = setTimeout(() => {
      try {
        const coordinates = filteredVoters
          .filter((voter) => Array.isArray(voter.location?.coordinates))
          .map((voter) => {
            const [lng, lat] = voter.location.coordinates
            return { latitude: lat, longitude: lng }
          })

        if (polygonCoordinates.length) {
          coordinates.push(...polygonCoordinates)
        }

        if (coordinates.length > 0) {
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
            animated: true
          })
        }
      } catch (error) {
        console.error("RouteMapScreen: fitToCoordinates error:", error)
      }
    }, 600)

    return () => clearTimeout(timeout)
  }, [filteredVoters, polygonCoordinates])

  const handleToggleTracking = async () => {
    if (trackingActive) {
      setTrackingActive(false)
      if (locationWatcher) {
        locationWatcher.remove()
        setLocationWatcher(null)
      }
      Toast.show({
        type: "info",
        text1: "Tracking Stopped",
        text2: "Live location paused."
      })
      return
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Toast.show({
          type: "info",
          text1: "Location Permission Needed",
          text2: "Allow location access to start tracking."
        })
        return
      }

      const watcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5
        },
        (position) => {
          const coords = position.coords
          const nextLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
          setUserLocation(nextLocation)
          mapRef.current?.animateToRegion(
            {
              ...nextLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            },
            800
          )
        }
      )

      setLocationWatcher(watcher)
      setTrackingActive(true)
      Toast.show({
        type: "success",
        text1: "Tracking Started",
        text2: "Live location tracking is active."
      })
    } catch (error) {
      console.error("RouteMapScreen: error starting tracking:", error)
      Toast.show({
        type: "error",
        text1: "Tracking Failed",
        text2: "Unable to start live tracking."
      })
    }
  }

  const focusOnVoter = (voter) => {
    if (!voter?.location?.coordinates) {
      return
    }

    const [lng, lat] = voter.location.coordinates
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      },
      600
    )

    const markerRef = markerRefs.current[voter._id]
    if (markerRef?.showCallout) {
      setTimeout(() => markerRef.showCallout(), 400)
    }
  }

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) {
      return
    }

    const match = filteredVoters[0]
    if (match) {
      focusOnVoter(match)
    } else {
      Toast.show({
        type: "info",
        text1: "No Match",
        text2: "No voter matches that search term."
      })
    }
  }

  const openStatusModal = (voter) => {
    setSelectedVoter(voter)
    setStatusModalVisible(true)
  }

  const closeStatusModal = () => {
    setSelectedVoter(null)
    setStatusModalVisible(false)
  }

  const handleUpdateStatus = async (nextStatus) => {
    if (!selectedVoter || !routeId || !nextStatus) {
      return
    }

    try {
      setIsUpdatingStatus(true)
      const response = await axios.patch(`${BaseUrl}/canvassing/${routeId}/voters/${selectedVoter._id}/status`, {
        status: nextStatus
      })

      if (response.data?.success) {
        setVoters((prev) =>
          prev.map((voter) =>
            voter._id === selectedVoter._id ? { ...voter, status: nextStatus } : voter
          )
        )
        
        // Refresh route data to update progress
        try {
          const routeResponse = await axios.get(`${BaseUrl}/canvassing/${routeId}`)
          if (routeResponse.data?.success) {
            const updatedRoute = routeResponse.data.data
            // Store updated route data to pass back to CanvassingScreen
            await AsyncStorage.setItem(`route_${routeId}`, JSON.stringify(updatedRoute))
            
            // Also update the route data in AsyncStorage with a flag to trigger refresh
            await AsyncStorage.setItem(`route_updated_${routeId}`, Date.now().toString())
          }
        } catch (refreshError) {
          console.error("RouteMapScreen: error refreshing route:", refreshError)
        }
        
        Toast.show({
          type: "success",
          text1: "Status Updated",
          text2: `${selectedVoter.firstName || ""} ${selectedVoter.lastName || ""} marked as ${formatStatusLabel(nextStatus)}.`
        })
        closeStatusModal()
      } else {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: response.data?.message || "Unable to update voter status."
        })
      }
    } catch (error) {
      console.error("RouteMapScreen: status update error:", error)
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.response?.data?.message || "Unable to update voter status."
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const renderStatusOption = (option) => {
    const isActive = selectedVoter?.status?.toLowerCase() === option.value
    return (
      <TouchableOpacity
        key={option.value}
        style={[styles.statusOption, isActive && styles.statusOptionActive]}
        onPress={() => handleUpdateStatus(option.value)}
        disabled={isUpdatingStatus}
      >
        <Text style={[styles.statusOptionText, isActive && styles.statusOptionTextActive]}>
          {option.label}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.headerBackButtonText}>← Routes</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.routeName}>{routeName || "Canvassing Route"}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.viewToggleButton, showListView && styles.viewToggleButtonActive]}
              onPress={() => setShowListView(!showListView)}
            >
              <Text style={styles.viewToggleButtonText}>
                {showListView ? "🗺️ Map" : "📋 List"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.trackingButton, trackingActive ? styles.trackingButtonActive : null]}
              onPress={handleToggleTracking}
            >
              <Text style={styles.trackingButtonText}>
                {trackingActive ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search voter by name or address"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchSubmit}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color="#F97316" />
          <Text style={styles.loadingText}>Loading route voters…</Text>
        </View>
      ) : showListView ? (
        <View style={styles.listWrapper}>
          <ScrollView style={styles.voterListScroll} contentContainerStyle={styles.voterListContainer}>
            {filteredVoters.length === 0 ? (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No voters found</Text>
              </View>
            ) : (
              filteredVoters.map((voter) => {
                const voterName = `${voter.firstName || ""} ${voter.lastName || ""}`.trim()
                const addressParts = [
                  voter.streetNo || "",
                  voter.streetName || "",
                  voter.residenceCity || "",
                  voter.residenceState || "",
                  voter.residenceZip || ""
                ].filter(Boolean)

                return (
                  <TouchableOpacity
                    key={voter._id}
                    style={styles.voterListItem}
                    onPress={() => openStatusModal(voter)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.voterListItemHeader}>
                      <Text style={styles.voterListItemName}>{voterName || "Unnamed Voter"}</Text>
                      <View style={[styles.voterStatusBadge, { backgroundColor: getMarkerColor(voter.status) }]}>
                        <Text style={styles.voterStatusBadgeText}>
                          {formatStatusLabel(voter.status)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.voterListItemAddress}>
                      {addressParts.length ? addressParts.join(", ") : "Address not available"}
                    </Text>
                    {voter.phone && (
                      <Text style={styles.voterListItemPhone}>{voter.phone}</Text>
                    )}
                  </TouchableOpacity>
                )
              })
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            followsUserLocation={trackingActive}
            mapType="standard"
            initialRegion={
              userLocation
                ? {
                    ...userLocation,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                  }
                : {
                    latitude: 37.0902,
                    longitude: -95.7129,
                    latitudeDelta: 30,
                    longitudeDelta: 30
                  }
            }
          >
            {polygonCoordinates.length > 0 && (
              <Polygon
                coordinates={polygonCoordinates}
                strokeColor="rgba(239, 68, 68, 0.9)"
                fillColor="rgba(239, 68, 68, 0.18)"
                strokeWidth={2}
              />
            )}

            {filteredVoters.map((voter) => {
              if (!Array.isArray(voter.location?.coordinates)) {
                return null
              }
              const [lng, lat] = voter.location.coordinates
              const markerCoordinate = { latitude: lat, longitude: lng }
              const voterName = `${voter.firstName || ""} ${voter.lastName || ""}`.trim()
              const addressParts = [
                voter.streetNo || "",
                voter.streetName || "",
                voter.residenceCity || "",
                voter.residenceState || "",
                voter.residenceZip || ""
              ].filter(Boolean)

              return (
                <Marker
                  key={voter._id}
                  coordinate={markerCoordinate}
                  pinColor={getMarkerColor(voter.status)}
                  onPress={() => openStatusModal(voter)}
                  ref={(ref) => {
                    if (ref) {
                      markerRefs.current[voter._id] = ref
                    } else {
                      delete markerRefs.current[voter._id]
                    }
                  }}
                >
                  {/* Custom marker with voter name - clickable */}
                  <View style={[styles.customMarker, { backgroundColor: getMarkerColor(voter.status) }]}>
                    <Text style={styles.markerName} numberOfLines={1}>
                      {voterName || "Voter"}
                    </Text>
                  </View>
                  
                  <Callout
                    onPress={() => openStatusModal(voter)}
                    tooltip={false}
                  >
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={() => openStatusModal(voter)}
                    >
                      <View style={styles.callout}>
                        <Text style={styles.calloutTitle}>{voterName || "Unnamed Voter"}</Text>
                        <Text style={styles.calloutSubtitle}>
                          {addressParts.length ? addressParts.join(", ") : "Address not available"}
                        </Text>
                        <View style={styles.calloutStatusRow}>
                          <Text style={styles.calloutStatusLabel}>Status:</Text>
                          <Text style={styles.calloutStatusValue}>
                            {formatStatusLabel(voter.status)}
                          </Text>
                        </View>
                        <View style={styles.calloutAction}>
                          <Text style={styles.calloutActionText}>Tap to update status</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Callout>
                </Marker>
              )
            })}
          </MapView>
        </View>
      )}

      <Modal
        visible={statusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStatusModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Status</Text>
            {selectedVoter && (
              <Text style={styles.modalSubtitle}>
                {(selectedVoter.firstName || "") + " " + (selectedVoter.lastName || "")}
              </Text>
            )}

            <View style={styles.statusOptionsContainer}>
              {STATUS_OPTIONS.map((option) => renderStatusOption(option))}
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeStatusModal}
              disabled={isUpdatingStatus}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#111827"
  },
  headerBackButton: {
    marginBottom: 8
  },
  headerBackButtonText: {
    color: "#F97316",
    fontSize: 16,
    fontWeight: "600"
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151"
  },
  viewToggleButtonActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626"
  },
  viewToggleButtonText: {
    color: "#F9FAFB",
    fontSize: 14,
    fontWeight: "600"
  },
  routeName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#F3F4F6"
  },
  trackingButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151"
  },
  trackingButtonActive: {
    backgroundColor: "#EF4444",
    borderColor: "#F87171"
  },
  trackingButtonText: {
    color: "#F9FAFB",
    fontSize: 16,
    fontWeight: "600"
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#111827",
    gap: 12
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1F2937",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    color: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#374151",
    fontSize: 15
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2563EB"
  },
  searchButtonText: {
    color: "#F9FAFB",
    fontWeight: "600"
  },
  mapWrapper: {
    flex: 1,
    backgroundColor: "#111827"
  },
  map: {
    flex: 1
  },
  loadingState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827"
  },
  loadingText: {
    marginTop: 12,
    color: "#D1D5DB"
  },
  callout: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 12,
    maxWidth: 260,
    borderWidth: 1,
    borderColor: "#1E293B"
  },
  calloutTitle: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 16
  },
  calloutSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4
  },
  calloutStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6
  },
  calloutStatusLabel: {
    color: "#CBD5F5",
    fontSize: 13,
    fontWeight: "500"
  },
  calloutStatusValue: {
    color: "#F97316",
    fontWeight: "600"
  },
  calloutAction: {
    marginTop: 10,
    backgroundColor: "#1F2937",
    paddingVertical: 6,
    borderRadius: 6
  },
  calloutActionText: {
    color: "#F59E0B",
    fontSize: 12,
    textAlign: "center"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B"
  },
  modalTitle: {
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4
  },
  modalSubtitle: {
    color: "#CBD5F5",
    marginBottom: 16
  },
  statusOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  statusOption: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#1F2937",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center"
  },
  statusOptionActive: {
    borderColor: "#F97316",
    backgroundColor: "#78350F"
  },
  statusOptionText: {
    color: "#E5E7EB",
    fontWeight: "500",
    fontSize: 15
  },
  statusOptionTextActive: {
    color: "#FCD34D"
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#374151",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  modalCloseButtonText: {
    color: "#E5E7EB",
    fontWeight: "600"
  },
  customMarker: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    minWidth: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    // Make it look clickable
    opacity: 0.95,
  },
  markerName: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  listWrapper: {
    flex: 1,
    backgroundColor: "#111827"
  },
  voterListScroll: {
    flex: 1
  },
  voterListContainer: {
    padding: 16
  },
  emptyListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40
  },
  emptyListText: {
    color: "#9CA3AF",
    fontSize: 16
  },
  voterListItem: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151"
  },
  voterListItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  voterListItemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#DC2626",
    textDecorationLine: "underline"
  },
  voterStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16
  },
  voterStatusBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600"
  },
  voterListItemAddress: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 4
  },
  voterListItemPhone: {
    color: "#9CA3AF",
    fontSize: 13
  }
})



