// "use client"

// import { useState } from "react"
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function CanvassingScreen({ navigation }) {
//   const [selectedRoute, setSelectedRoute] = useState(null)

//   const routes = [
//     {
//       id: 1,
//       name: "Downtown Route A",
//       houses: 45,
//       estimated: "2.5 hours",
//       status: "Not Started",
//     },
//     {
//       id: 2,
//       name: "Residential District B",
//       houses: 62,
//       estimated: "3.2 hours",
//       status: "In Progress",
//     },
//     {
//       id: 3,
//       name: "Suburban Area C",
//       houses: 38,
//       estimated: "2.1 hours",
//       status: "Completed",
//     },
//   ]

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Completed":
//         return { ...styles.statusBadge, backgroundColor: "#DCFCE7", color: "#16A34A" }
//       case "In Progress":
//         return { ...styles.statusBadge, backgroundColor: "#DBEAFE", color: "#2563EB" }
//       case "Not Started":
//         return { ...styles.statusBadge, backgroundColor: "#F3F4F6", color: "#6B7280" }
//       default:
//         return { ...styles.statusBadge, backgroundColor: "#F3F4F6", color: "#6B7280" }
//     }
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backButton}>← Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Canvassing Routes</Text>
//         </View>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <TouchableOpacity style={styles.generateButton}>
//           <Text style={styles.generateButtonText}>🗺️ Generate New Route</Text>
//           <Text style={styles.generateButtonSubtext}>AI-powered route optimization</Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Your Routes</Text>

//         {routes.map((route) => (
//           <TouchableOpacity key={route.id} style={styles.routeCard} onPress={() => setSelectedRoute(route.id)}>
//             <View style={styles.routeHeader}>
//               <View style={styles.routeInfo}>
//                 <Text style={styles.routeName}>{route.name}</Text>
//                 <Text style={styles.routeDetails}>
//                   {route.houses} houses • {route.estimated}
//                 </Text>
//               </View>
//               <View style={getStatusStyle(route.status)}>
//                 <Text style={[styles.statusText, { color: getStatusStyle(route.status).color }]}>{route.status}</Text>
//               </View>
//             </View>

//             {selectedRoute === route.id && (
//               <View style={styles.expandedContent}>
//                 <View style={styles.mapPreview}>
//                   <Text style={styles.mapPreviewTitle}>📍 Route Preview</Text>
//                   <Text style={styles.mapPreviewText}>
//                     Interactive map would be displayed here showing the optimized walking path through the neighborhood
//                     with marked houses to visit.
//                   </Text>
//                 </View>

//                 <View style={styles.actionButtons}>
//                   <TouchableOpacity style={[styles.actionButton, styles.startButton]}>
//                     <Text style={styles.actionButtonText}>Start Route</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[styles.actionButton, styles.viewMapButton]}>
//                     <Text style={styles.actionButtonText}>View Map</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
//                     <Text style={styles.actionButtonText}>📤</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}

//         <View style={styles.tipsContainer}>
//           <Text style={styles.tipsTitle}>💡 Canvassing Tips</Text>
//           <Text style={styles.tipsText}>
//             • Best times: 10am-12pm and 4pm-7pm{"\n"}• Avoid meal times and early mornings{"\n"}• Mark visited houses to
//             avoid duplicates{"\n"}• Keep interactions brief and friendly
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
//   generateButton: {
//     backgroundColor: "#3B82F6",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 24,
//   },
//   generateButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   generateButtonSubtext: {
//     color: "#BFDBFE",
//     textAlign: "center",
//     marginTop: 4,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginBottom: 16,
//   },
//   routeCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   routeHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 12,
//   },
//   routeInfo: {
//     flex: 1,
//   },
//   routeName: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//   },
//   routeDetails: {
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
//   expandedContent: {
//     borderTopWidth: 1,
//     borderTopColor: "#E5E7EB",
//     paddingTop: 16,
//     marginTop: 16,
//   },
//   mapPreview: {
//     backgroundColor: "#F9FAFB",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//   },
//   mapPreviewTitle: {
//     color: "#374151",
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   mapPreviewText: {
//     color: "#6B7280",
//   },
//   actionButtons: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   actionButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   startButton: {
//     backgroundColor: "#16A34A",
//     flex: 1,
//   },
//   viewMapButton: {
//     backgroundColor: "#3B82F6",
//     flex: 1,
//   },
//   shareButton: {
//     backgroundColor: "#6B7280",
//   },
//   actionButtonText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "500",
//   },
//   tipsContainer: {
//     backgroundColor: "#FFFBEB",
//     borderWidth: 1,
//     borderColor: "#FDE68A",
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 16,
//   },
//   tipsTitle: {
//     color: "#92400E",
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   tipsText: {
//     color: "#B45309",
//     fontSize: 14,
//   },
// })








"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
import MapView, { Marker, Polygon } from "react-native-maps"
import Toast from "react-native-toast-message"
import * as Location from "expo-location"
import axios from "axios"
import BaseUrl from "../../BaseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"

export default function CanvassingScreen({ navigation }) {
  const [routes, setRoutes] = useState([])
  const [showCreateCard, setShowCreateCard] = useState(false)
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [campaignId, setCampaignId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [boundaryPoints, setBoundaryPoints] = useState([])
  const [previewVoters, setPreviewVoters] = useState([])
  const [previewLoading, setPreviewLoading] = useState(false)
  const [formState, setFormState] = useState({
    routeName: "",
      priority: "Medium",
    notes: "",
  })
  const [mapSearchQuery, setMapSearchQuery] = useState("")
  const [isMapFullScreen, setIsMapFullScreen] = useState(false)
  const mapRef = useRef(null)
  const fullScreenMapRef = useRef(null)
  const [expandedRouteId, setExpandedRouteId] = useState(null)
  const [routeVoterCache, setRouteVoterCache] = useState({})
  const [routeDetailLoading, setRouteDetailLoading] = useState(false)
  const [startRouteLoadingId, setStartRouteLoadingId] = useState(null)
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [selectedVoter, setSelectedVoter] = useState(null)
  const [selectedRouteId, setSelectedRouteId] = useState(null)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [selectedVolunteerRoute, setSelectedVolunteerRoute] = useState(null)
  const [isVolunteer, setIsVolunteer] = useState(false)
  const [stats, setStats] = useState({
    totalAddresses: 0,
    completed: 0,
    progress: 0
  })
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  const STATUS_OPTIONS = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Moved", value: "moved" },
    { label: "Undecided", value: "undecided" }
  ]

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
        } else {
          // Check for selected volunteer route
          const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute')
          if (selectedRoute) {
            const routeData = JSON.parse(selectedRoute)
            setSelectedVolunteerRoute(routeData)
            // Set campaignId from selected route if no campaign stored
            if (routeData.campaignId) {
              setCampaignId(routeData.campaignId)
            }
          } else if (userIsVolunteer) {
            // Volunteer but no route selected - clear routes
            setRoutes([])
            setCampaignId(null)
          }
        }

        const storedUser = await AsyncStorage.getItem("userData")
        if (storedUser) {
          const user = JSON.parse(storedUser)
          setUserId(user.userId || user._id)
        }
      } catch (error) {
        console.error("Failed to load campaign/user data:", error)
        Toast.show({
          type: "error",
          text1: "Setup Error",
          text2: "Unable to load campaign information.",
        })
      }
    }

    initialize()
  }, [])

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Toast.show({
          type: "info",
          text1: "Location Permission",
          text2: "Grant location access to center the map near you.",
        })
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }

    requestLocationPermission()
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true)
      
      // Get current campaignId and selected route
      const storedCampaign = await AsyncStorage.getItem("currentCampaign")
      const currentCampaignId = storedCampaign ? JSON.parse(storedCampaign)._id : null
      const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute')
      
      let routeData = null
      let routeCampaignId = currentCampaignId || campaignId
      
      if (selectedRoute) {
        routeData = JSON.parse(selectedRoute)
        if (routeData.campaignId) {
          routeCampaignId = routeData.campaignId
        }
      }
      
      if (!routeCampaignId) {
        setStats({ totalAddresses: 0, completed: 0, progress: 0 })
        return
      }
      
      // Build query params
      const params = { campaignId: routeCampaignId }
      if (routeData?.routeId) {
        params.routeId = routeData.routeId
      }
      
      const response = await axios.get(`${BaseUrl}/canvassing/stats`, { params })
      
      if (response.data?.success) {
        setStats({
          totalAddresses: response.data.data.totalAddresses || 0,
          completed: response.data.data.completed || 0,
          progress: response.data.data.progress || 0
        })
      } else {
        setStats({ totalAddresses: 0, completed: 0, progress: 0 })
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
      setStats({ totalAddresses: 0, completed: 0, progress: 0 })
    } finally {
      setIsLoadingStats(false)
    }
  }, [campaignId])

  const fetchRoutes = useCallback(async () => {
    try {
      setIsLoadingRoutes(true)
      
      // Get current campaignId and selected route
      const storedCampaign = await AsyncStorage.getItem("currentCampaign")
      const currentCampaignId = storedCampaign ? JSON.parse(storedCampaign)._id : null
      const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute')
      
      let routeData = null
      let routeCampaignId = currentCampaignId || campaignId
      
      if (selectedRoute) {
        routeData = JSON.parse(selectedRoute)
        setSelectedVolunteerRoute(routeData)
        // Use campaignId from route assignment if available
        if (routeData.campaignId) {
          routeCampaignId = routeData.campaignId
          if (!currentCampaignId && routeData.campaignId !== campaignId) {
            setCampaignId(routeData.campaignId)
          }
        }
      } else {
        setSelectedVolunteerRoute(null)
      }
      
      // If volunteer route is selected, fetch only that route
      if (routeData?.routeId) {
        try {
          const routeResponse = await axios.get(`${BaseUrl}/canvassing/${routeData.routeId}`)
          if (routeResponse.data?.success) {
            setRoutes([routeResponse.data.data])
          } else {
            setRoutes([])
          }
        } catch (routeError) {
          console.error("Error fetching volunteer route:", routeError)
          setRoutes([])
        }
      } else {
        // If volunteer and no route selected, don't fetch routes
        if (isVolunteer && !routeData) {
          setRoutes([])
          setIsLoadingRoutes(false)
          return
        }
        
        // Fetch all routes (only if campaignId exists)
        if (!routeCampaignId) {
          setRoutes([])
          return
        }
        const response = await axios.get(`${BaseUrl}/canvassing`, {
          params: { campaignId: routeCampaignId },
        })
        if (response.data?.success) {
          setRoutes(Array.isArray(response.data.data) ? response.data.data : [])
        }
      }
      
      // Fetch stats after routes are loaded
      await fetchStats()
    } catch (error) {
      console.error("Error fetching routes:", error)
      Toast.show({
        type: "error",
        text1: "Routes Error",
        text2: "Unable to load existing routes.",
      })
    } finally {
      setIsLoadingRoutes(false)
    }
  }, [campaignId, fetchStats])

  useEffect(() => {
    fetchRoutes()
  }, [fetchRoutes])

  // Refresh routes when screen comes into focus (e.g., returning from RouteMapScreen)
  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        try {
          // Check if user is volunteer
          const storedCampaign = await AsyncStorage.getItem("currentCampaign")
          const volunteerStatus = await AsyncStorage.getItem("isVolunteer")
          const userIsVolunteer = volunteerStatus === "true" && !storedCampaign
          setIsVolunteer(userIsVolunteer)
          
          // Check for selected volunteer route
          const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute')
          if (selectedRoute) {
            const routeData = JSON.parse(selectedRoute)
            setSelectedVolunteerRoute(routeData)
            // If volunteer and no campaign, set campaignId from route
            if (!storedCampaign && routeData.campaignId) {
              setCampaignId(routeData.campaignId)
            }
          } else {
            setSelectedVolunteerRoute(null)
            // If volunteer and no route selected, clear routes
            if (userIsVolunteer) {
              setRoutes([])
              setCampaignId(null)
            }
          }
          
          // Refresh routes and stats
          await fetchRoutes()
          await fetchStats()
        } catch (error) {
          console.error("Error refreshing data:", error)
        }
      }
      
      refreshData()
      
      // Check for updated route data from AsyncStorage (existing code continues)
      const checkForRouteUpdates = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys()
          const routeUpdateKeys = keys.filter(key => key.startsWith('route_updated_'))
          
          if (routeUpdateKeys.length > 0) {
            // Fetch fresh routes from API to get updated progress
            await fetchRoutes()
            
            // Clean up stored route update flags
            await AsyncStorage.multiRemove(routeUpdateKeys)
            
            // Also clean up any old route_ keys
            const routeKeys = keys.filter(key => key.startsWith('route_') && !key.startsWith('route_updated_'))
            if (routeKeys.length > 0) {
              await AsyncStorage.multiRemove(routeKeys)
            }
          }
        } catch (error) {
          console.error("Error checking for route updates:", error)
        }
      }
      
      checkForRouteUpdates()
    }, [fetchRoutes])
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#DC2626" // Red for completed
      case "In Progress":
        return "#F59E0B" // Amber for in progress
      case "Started":
        return "#3B82F6" // Blue for started
      default:
        return "#6B7280" // Gray for not started
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#DC2626" // Red for high priority
      case "Medium":
        return "#F59E0B" // Amber for medium
      default:
        return "#6B7280" // Gray for low
    }
  }

  const getVoterStatusColor = (status) => {
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

  const boundaryCoordinates = useMemo(() => {
    return boundaryPoints.length > 0 ? boundaryPoints : []
  }, [boundaryPoints])

  const region = useMemo(() => {
    if (boundaryPoints.length > 0) {
      const lats = boundaryPoints.map((point) => point.latitude)
      const lngs = boundaryPoints.map((point) => point.longitude)
      const minLat = Math.min(...lats)
      const maxLat = Math.max(...lats)
      const minLng = Math.min(...lngs)
      const maxLng = Math.max(...lngs)
      return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.max(maxLat - minLat, 0.01),
        longitudeDelta: Math.max(maxLng - minLng, 0.01),
      }
    }

    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    }

    return {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
  }, [boundaryPoints, userLocation])

  const focusMapsOnRegion = (latitude, longitude, delta = 0.04) => {
    const normalizedDelta = Math.max(delta, 0.01)
    const targetRegion = {
      latitude,
      longitude,
      latitudeDelta: normalizedDelta,
      longitudeDelta: normalizedDelta,
    }
    mapRef.current?.animateToRegion(targetRegion, 600)
    fullScreenMapRef.current?.animateToRegion(targetRegion, 600)
    setUserLocation({ latitude, longitude })
  }

  const handleSearchLocation = async () => {
    const query = mapSearchQuery.trim()
    if (!query) {
      Toast.show({
        type: "info",
        text1: "Enter City",
        text2: "Type a city or address to search on the map.",
      })
      return
    }

    try {
      const results = await Location.geocodeAsync(query)
      if (!results || results.length === 0) {
        Toast.show({
          type: "info",
          text1: "Not Found",
          text2: "No matching location found. Try a different search.",
        })
        return
      }

      const { latitude, longitude } = results[0]
      focusMapsOnRegion(latitude, longitude, 0.06)
      Toast.show({
        type: "success",
        text1: "Location Found",
        text2: `Centered on ${query}`,
      })
    } catch (error) {
      console.error("Location search error:", error)
      Toast.show({
        type: "error",
        text1: "Search Failed",
        text2: "Unable to locate that place right now.",
      })
    }
  }

  const handleOpenFullScreenMap = () => {
    setIsMapFullScreen(true)
    setTimeout(() => {
      if (fullScreenMapRef.current && region) {
        fullScreenMapRef.current.animateToRegion(region, 0)
      }
    }, 250)
  }

  const handleCloseFullScreenMap = () => {
    setIsMapFullScreen(false)
  }

  const handleAddBoundaryPoint = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    setBoundaryPoints((prev) => [...prev, { latitude, longitude }])
  }

  const handleUndoPoint = () => {
    setBoundaryPoints((prev) => prev.slice(0, -1))
  }

const handleResetBoundary = () => {
  setBoundaryPoints([])
  setPreviewVoters([])
}

  const handlePreviewVoters = async () => {
    if (!campaignId) {
      Toast.show({
        type: "error",
        text1: "Campaign Missing",
        text2: "Select a campaign before generating routes.",
      })
      return
    }

    if (boundaryPoints.length < 3) {
      Toast.show({
        type: "error",
        text1: "Boundary Required",
        text2: "Add at least three points to define a boundary.",
      })
      return
    }

    try {
      setPreviewLoading(true)
      const coordinates = boundaryPoints.map((point) => [point.longitude, point.latitude])
      coordinates.push(coordinates[0])

      const payload = {
        campaignId,
        boundary: {
          type: "Polygon",
          coordinates: [coordinates],
        },
      }

      const response = await axios.post(`${BaseUrl}/canvassing/preview`, payload)

      if (response.data?.success) {
        setPreviewVoters(response.data.data?.voters || [])
        Toast.show({
          type: "success",
          text1: "Voters Found",
          text2: `${response.data.data?.total || 0} voters in selected area.`,
        })
      } else {
        Toast.show({
          type: "info",
          text1: "No Voters",
          text2: "No voters found within selected boundary.",
        })
        setPreviewVoters([])
      }
    } catch (error) {
      console.error("Preview voters error:", error)
      Toast.show({
        type: "error",
        text1: "Preview Failed",
        text2: error.response?.data?.message || "Unable to preview voters in boundary.",
      })
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveRoute = async () => {
    if (!campaignId || !userId) {
      Toast.show({
        type: "error",
        text1: "Missing Data",
        text2: "Campaign and user details are required to create a route.",
      })
      return
    }

    if (!formState.routeName.trim()) {
      Toast.show({
        type: "error",
        text1: "Route Name Required",
        text2: "Please provide a route name.",
      })
      return
    }

    if (boundaryPoints.length < 3) {
      Toast.show({
        type: "error",
        text1: "Incomplete Boundary",
        text2: "Add at least three points to define the route boundary.",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const coordinates = boundaryPoints.map((point) => [point.longitude, point.latitude])
      coordinates.push(coordinates[0])

      const payload = {
        routeName: formState.routeName.trim(),
        priority: formState.priority,
        notes: formState.notes,
        campaignId,
        createdBy: userId,
        boundary: {
          type: "Polygon",
          coordinates: [coordinates],
        },
      }

      const response = await axios.post(`${BaseUrl}/canvassing`, payload)

      if (response.data?.success) {
        const newRoute = response.data.data?.route
        const voters = response.data.data?.voters || []
        if (newRoute) {
          setRoutes((prev) => [newRoute, ...prev])
          setRouteVoterCache((prev) => ({
            ...prev,
            [newRoute._id || newRoute.id]: voters,
          }))
        }

        Toast.show({
          type: "success",
          text1: "Route Saved",
          text2: `${formState.routeName.trim()} created with ${voters.length} voters.`,
        })

        setShowCreateCard(false)
        setFormState({
          routeName: "",
          priority: "Medium",
          notes: "",
        })
        setBoundaryPoints([])
        setPreviewVoters([])
      } else {
        Toast.show({
          type: "error",
          text1: "Save Failed",
          text2: response.data?.message || "Unable to save the route.",
        })
      }
    } catch (error) {
      console.error("Save route error:", error)
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: error.response?.data?.message || "Unable to save the route.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleCreateCard = () => {
    const nextValue = !showCreateCard
    setShowCreateCard(nextValue)
    if (nextValue) {
      setFormState({
        routeName: "",
        priority: "Medium",
        notes: "",
      })
      setBoundaryPoints([])
      setPreviewVoters([])
    } else {
      setBoundaryPoints([])
      setPreviewVoters([])
      setFormState((prev) => ({ ...prev, routeName: "", notes: "" }))
    }
  }

  const handleStartRoute = async (route) => {
    const routeId = route._id || route.id
    if (!routeId) {
      Toast.show({
        type: "error",
        text1: "Route Missing",
        text2: "Unable to identify the selected route."
      })
      return
    }

    try {
      setStartRouteLoadingId(routeId)
      const voters = await fetchRouteVoters(routeId)

      const parentNavigator = navigation.getParent ? navigation.getParent() : null
      const navigator = parentNavigator || navigation
      navigator.navigate("RouteMap", {
        routeId,
        routeName: route.routeName || route.name,
        boundary: route.boundary,
        voters,
        campaignId
      })
    } catch (error) {
      console.error("Start route navigation error:", error)
      Toast.show({
        type: "error",
        text1: "Unable to Start Route",
        text2: error.response?.data?.message || error.message || "Failed to open route map."
      })
    } finally {
      setStartRouteLoadingId(null)
    }
  }

  const fetchRouteVoters = async (routeId) => {
    if (!routeId) {
      return []
    }

    if (routeVoterCache[routeId]) {
      return routeVoterCache[routeId]
    }

    try {
      const response = await axios.get(`${BaseUrl}/canvassing/${routeId}`)
      if (response.data?.success) {
        const voters = Array.isArray(response.data.data?.voters) ? response.data.data.voters : []
        setRouteVoterCache((prev) => ({
          ...prev,
          [routeId]: voters,
        }))
        return voters
      }
      throw new Error(response.data?.message || "Unable to load route voters.")
    } catch (error) {
      console.error("Fetch route voters error:", error)
      throw error
    }
  }

  const handleViewRoute = async (route) => {
    const routeId = route._id || route.id
    if (!routeId) return

    if (expandedRouteId === routeId) {
      setExpandedRouteId(null)
      return
    }

    if (routeVoterCache[routeId]) {
      setExpandedRouteId(routeId)
      return
    }

    try {
      setExpandedRouteId(routeId)
      setRouteDetailLoading(true)
      await fetchRouteVoters(routeId)
      setExpandedRouteId(routeId)
    } catch (error) {
      console.error("Fetch route detail error:", error)
      Toast.show({
        type: "error",
        text1: "Route Detail Error",
        text2: error.response?.data?.message || "Unable to load route details.",
      })
    } finally {
      setRouteDetailLoading(false)
    }
  }

  const openStatusModal = (voter, routeId) => {
    setSelectedVoter(voter)
    setSelectedRouteId(routeId)
    setStatusModalVisible(true)
  }

  const closeStatusModal = () => {
    setSelectedVoter(null)
    setSelectedRouteId(null)
    setStatusModalVisible(false)
  }

  const handleModalStatusUpdate = async (newStatus) => {
    if (!selectedVoter || !newStatus) {
      return
    }

    try {
      setIsUpdatingStatus(true)
      
      // Use the route-specific endpoint if we have a routeId, otherwise use the general voter endpoint
      let response
      if (selectedRouteId) {
        response = await axios.patch(`${BaseUrl}/canvassing/${selectedRouteId}/voters/${selectedVoter._id}/status`, {
          status: newStatus
        })
      } else {
        response = await axios.patch(`${BaseUrl}/voter/status/${selectedVoter._id}`, {
          status: newStatus
        })
      }

      if (response.data?.success) {
        // Update the voter in the cache
        if (selectedRouteId && routeVoterCache[selectedRouteId]) {
          setRouteVoterCache((prev) => ({
            ...prev,
            [selectedRouteId]: prev[selectedRouteId].map((voter) =>
              voter._id === selectedVoter._id ? { ...voter, status: newStatus } : voter
            )
          }))
        }

        Toast.show({
          type: "success",
          text1: "Status Updated",
          text2: `${selectedVoter.firstName || ""} ${selectedVoter.lastName || ""} marked as ${newStatus}.`,
        })
        closeStatusModal()
        
        // Refresh stats after status update
        await fetchStats()
      } else {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: response.data?.message || "Unable to update voter status.",
        })
      }
    } catch (error) {
      console.error("CanvassingScreen: status update error:", error)
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.response?.data?.message || "Unable to update voter status.",
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🗺️ Canvassing Routes</Text>
        </View>
        {selectedVolunteerRoute && (
          <View style={styles.routeIndicator}>
            <Text style={styles.routeIndicatorText}>
              📍 Viewing: {selectedVolunteerRoute.routeName}
            </Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {isLoadingStats ? "..." : stats.totalAddresses.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>📍 Total Addresses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {isLoadingStats ? "..." : stats.completed.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>✅ Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {isLoadingStats ? "..." : `${stats.progress}%`}
            </Text>
            <Text style={styles.statLabel}>📊 Progress</Text>
          </View>
        </View>

        <View style={styles.routesContainer}>
          <Text style={styles.sectionTitle}>📋 Active Routes</Text>

          {isLoadingRoutes && (
            <View style={styles.loadingCard}>
              <Text style={styles.loadingText}>Loading routes...</Text>
            </View>
          )}

          {!isLoadingRoutes && routes.length === 0 && (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No routes created yet.</Text>
            </View>
          )}

          {!isLoadingRoutes && routes.map((route) => {
            const routeId = route._id || route.id
            const totalVoters = route.totalVoters ?? route.addresses ?? 0
            const completedVoters = route.completedVoters ?? route.completed ?? 0
            const computedProgress =
              route.progress !== undefined && route.progress !== null
                ? route.progress
                : totalVoters === 0
                ? 0
                : (completedVoters / totalVoters) * 100
            const progressPercent = Math.max(0, Math.min(100, Math.round(computedProgress)))
            const boundaryCoords = route.boundary?.coordinates?.[0] || []
            const latLngBoundary = boundaryCoords
              .filter(Boolean)
              .map(([lng, lat]) => ({ latitude: lat, longitude: lng }))

            return (
            <View key={routeId} style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <View style={styles.routeTitleRow}>
                  <Text style={styles.routeName}>{route.routeName || route.name}</Text>
                  <Text style={styles.routeMetaText}>
                    {route.createdAt ? new Date(route.createdAt).toLocaleString() : ""}
                  </Text>
                </View>

                <View style={styles.routeTagGroup}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(route.priority || "Medium") }]}>
                    <Text style={styles.priorityText}>{route.priority || "Medium"}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(route.status || "Not Started") }]}>
                    <Text style={styles.statusText}>{route.status || "Not Started"}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.routeStats}>
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatNumber}>{completedVoters}</Text>
                  <Text style={styles.routeStatLabel}>Completed</Text>
                </View>
                <View style={styles.routeStatDivider} />
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatNumber}>{totalVoters}</Text>
                  <Text style={styles.routeStatLabel}>Total</Text>
                </View>
                <View style={styles.routeStatDivider} />
                <View style={styles.routeStat}>
                  <Text style={styles.routeStatNumber}>{progressPercent}%</Text>
                  <Text style={styles.routeStatLabel}>Progress</Text>
                </View>
              </View>

              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${progressPercent}%`,
                        backgroundColor: getStatusColor(route.status || "Not Started"),
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.routeActions}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[
                      styles.startRouteButton,
                      startRouteLoadingId === routeId && styles.buttonDisabled,
                    ]}
                    onPress={() => handleStartRoute(route)}
                    disabled={startRouteLoadingId === routeId}
                  >
                    {startRouteLoadingId === routeId ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.startRouteButtonText}>▶ Start</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleViewRoute(route)}
                  >
                    <Text style={styles.actionButtonText}>👁️ View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={() => handleViewRoute(route)}
                  >
                    <Text style={styles.primaryActionButtonText}>
                      {expandedRouteId === routeId ? "Hide Details" : "View Details"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {expandedRouteId === routeId && (
                <View style={styles.expandedRouteCard}>
                  {routeDetailLoading && (
                    <View style={styles.loadingCard}>
                      <ActivityIndicator size="small" color="#F9FAFB" />
                      <Text style={[styles.loadingText, { marginTop: 8 }]}>Loading voters…</Text>
            </View>
                  )}

                  {!routeDetailLoading && (
                    <>
                      <View style={styles.expandedMapContainer}>
                        <MapView
                          style={styles.expandedMap}
                          initialRegion={
                            latLngBoundary.length
                              ? {
                                  latitude: latLngBoundary[0].latitude,
                                  longitude: latLngBoundary[0].longitude,
                                  latitudeDelta: 0.02,
                                  longitudeDelta: 0.02,
                                }
                              : region
                          }
                        >
                          {latLngBoundary.length > 0 && (
                            <Polygon
                              coordinates={latLngBoundary}
                              strokeColor="#DC2626"
                              fillColor="rgba(220,38,38,0.15)"
                              strokeWidth={2}
                            />
                          )}

                          {latLngBoundary.map((point, index) => (
                            <Marker
                              key={`route-${routeId}-boundary-${index}`}
                              coordinate={point}
                              pinColor="#F87171"
                            />
                          ))}

                          {(routeVoterCache[routeId] || []).map((voter) => {
                            if (!voter.location?.coordinates) return null
                            const [lng, lat] = voter.location.coordinates
                            return (
                              <Marker
                                key={`route-${routeId}-voter-${voter._id}`}
                                coordinate={{ latitude: lat, longitude: lng }}
                                title={`${voter.firstName || ""} ${voter.lastName || ""}`.trim()}
                                description={voter.address || voter.streetName || ""}
                                pinColor={getVoterStatusColor(voter.status)}
                              />
                            )
                          })}
                        </MapView>
        </View>

                      <Text style={styles.voterListTitle}>Assigned Voters</Text>
                      <View style={styles.voterList}>
                        {(routeVoterCache[routeId] || []).map((voter) => (
                          <TouchableOpacity 
                            key={voter._id} 
                            style={styles.voterListItem}
                            onPress={() => openStatusModal(voter, routeId)}
                            activeOpacity={0.7}
                          >
                            <View style={styles.voterListItemHeader}>
                              <Text style={styles.voterName}>
                                {(voter.firstName || "") + " " + (voter.lastName || "")}
                              </Text>
                              <View style={[styles.statusPill, { backgroundColor: getVoterStatusColor(voter.status) }]}>
                                <Text style={styles.statusPillText}>{(voter.status || "undecided").toUpperCase()}</Text>
                              </View>
                            </View>
                            <Text style={styles.voterAddressText}>
                              {voter.streetNo ? `${voter.streetNo} ` : ""}
                              {voter.streetName || voter.address || ""}
                            </Text>
                            <Text style={styles.voterMetaText}>
                              {voter.residenceCity ? `${voter.residenceCity}, ` : ""}
                              {voter.residenceState || ""} {voter.residenceZip || ""}
                            </Text>
                          </TouchableOpacity>
                        ))}

                        {(routeVoterCache[routeId] || []).length === 0 && (
                          <Text style={styles.emptyText}>No voters assigned yet.</Text>
                        )}
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>
          )})}
        </View>

        {/* Only show Generate New Route button if user has a campaign (not a volunteer) */}
        {!isVolunteer && campaignId && (
          <TouchableOpacity
            style={styles.generateButton}
            onPress={handleToggleCreateCard}
          >
            <Text style={styles.generateButtonText}>🤖 Generate New Route</Text>
            <Text style={styles.generateButtonDescription}>
              Create a new canvassing assignment with map boundary and voter preview.
            </Text>
          </TouchableOpacity>
        )}

        {showCreateCard && (
          <View style={styles.createCard}>
            <Text style={styles.createCardTitle}>Create Canvassing Route</Text>
            <Text style={styles.createCardSubtitle}>
              Define the area to canvass and preview households within the boundary.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Route Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., North Ward - Weekend Blitz"
                placeholderTextColor="#6B7280"
                value={formState.routeName}
                onChangeText={(text) => handleChange("routeName", text)}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Priority</Text>
              <View style={styles.prioritySelector}>
                {["High", "Medium", "Low"].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityOption,
                      formState.priority === priority && styles.priorityOptionSelected,
                    ]}
                    onPress={() => handleChange("priority", priority)}
                  >
                    <Text
                      style={[
                        styles.priorityOptionText,
                        formState.priority === priority && styles.priorityOptionTextSelected,
                      ]}
                    >
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Add instructions for canvassers (optional)"
                placeholderTextColor="#6B7280"
                value={formState.notes}
                onChangeText={(text) => handleChange("notes", text)}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Boundary (tap map to add points)</Text>

              <View style={styles.mapToolbar}>
                <View style={styles.mapSearchContainer}>
                  <TextInput
                    style={styles.mapSearchInput}
                    placeholder="Search city, address or ZIP"
                    placeholderTextColor="#6B7280"
                    value={mapSearchQuery}
                    onChangeText={setMapSearchQuery}
                    returnKeyType="search"
                    onSubmitEditing={handleSearchLocation}
                  />
                  <TouchableOpacity style={styles.mapSearchButton} onPress={handleSearchLocation}>
                    <Text style={styles.mapSearchButtonText}>Search</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.fullscreenButton} onPress={handleOpenFullScreenMap}>
                  <Text style={styles.fullscreenButtonText}>Full Screen</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mapContainer}>
                <MapView
                  ref={mapRef}
                  style={styles.map}
                  initialRegion={region}
                  region={region}
                  onLongPress={handleAddBoundaryPoint}
                  showsUserLocation
                  showsMyLocationButton
                >
                  {boundaryCoordinates.length > 0 && (
                    <Polygon
                      coordinates={boundaryCoordinates}
                      strokeColor="#DC2626"
                      fillColor="rgba(220,38,38,0.2)"
                      strokeWidth={2}
                    />
                  )}

              {boundaryCoordinates.map((point, index) => (
                <Marker
                  key={`boundary-${index}`}
                  coordinate={point}
                  pinColor="#F87171"
                  title={`Point ${index + 1}`}
                />
              ))}

                  {previewVoters.map((voter) => {
                    if (!voter.location || !Array.isArray(voter.location.coordinates)) {
                      return null
                    }

                    const [longitude, latitude] = voter.location.coordinates
                    return (
                      <Marker
                        key={voter._id}
                        coordinate={{ latitude, longitude }}
                        title={`${voter.firstName || ""} ${voter.lastName || ""}`.trim()}
                        description={voter.address || voter.streetName || ""}
                      />
                    )
                  })}
                </MapView>

                <View style={styles.boundaryHint}>
                  <Text style={styles.boundaryHintText}>
                    Long-press to add boundary points. Use the controls below to preview or reset.
                  </Text>
                </View>
              </View>

              <View style={styles.mapActions}>
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    boundaryPoints.length === 0 && styles.buttonDisabled,
                  ]}
                  onPress={handleUndoPoint}
                  disabled={boundaryPoints.length === 0}
                >
                  <Text style={styles.secondaryButtonText}>Undo Last Point</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    boundaryPoints.length === 0 && styles.buttonDisabled,
                  ]}
                  onPress={handleResetBoundary}
                  disabled={boundaryPoints.length === 0}
                >
                  <Text style={styles.secondaryButtonText}>Reset Boundary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.primaryActionButton,
                    styles.previewButton,
                    previewLoading && styles.buttonDisabled,
                  ]}
                  onPress={handlePreviewVoters}
                  disabled={previewLoading}
                >
                  {previewLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.primaryActionButtonText}>Preview Voters</Text>
                  )}
                </TouchableOpacity>
              </View>

              {previewVoters.length > 0 && (
                <View style={styles.previewSummary}>
                  <Text style={styles.previewSummaryText}>
                    {previewVoters.length} voters found in selected area.
                  </Text>
                </View>
              )}

              {previewVoters.length > 0 && (
                <View style={styles.previewList}>
                  <ScrollView nestedScrollEnabled>
                    {previewVoters.map((voter) => (
                      <View key={voter._id} style={styles.previewListItem}>
                        <Text style={styles.previewVoterName}>
                          {(voter.firstName || "") + " " + (voter.lastName || "")}
                        </Text>
                        <Text style={styles.previewVoterAddress}>
                          {voter.streetNo ? `${voter.streetNo} ` : ""}
                          {voter.streetName || voter.address || ""}
                        </Text>
                        <Text style={styles.previewVoterMeta}>
                          {voter.residenceCity ? `${voter.residenceCity}, ` : ""}
                          {voter.residenceState || ""} {voter.residenceZip || ""}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.formFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleToggleCreateCard}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryActionButton, styles.submitButton]}
                disabled={isSubmitting}
                onPress={handleSaveRoute}
              >
                <Text style={styles.primaryActionButtonText}>
                  {isSubmitting ? "Saving..." : "Save Route"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={isMapFullScreen}
        animationType="slide"
        onRequestClose={handleCloseFullScreenMap}
      >
        <SafeAreaView style={styles.fullscreenModalContainer}>
          <View style={styles.fullscreenHeader}>
            <Text style={styles.fullscreenTitle}>Adjust Route Boundary</Text>
            <TouchableOpacity
              style={styles.fullscreenCloseButton}
              onPress={handleCloseFullScreenMap}
            >
              <Text style={styles.fullscreenCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fullscreenToolbar}>
            <View style={styles.mapSearchContainer}>
              <TextInput
                style={styles.mapSearchInput}
                placeholder="Search city, address or ZIP"
                placeholderTextColor="#6B7280"
                value={mapSearchQuery}
                onChangeText={setMapSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearchLocation}
              />
              <TouchableOpacity style={styles.mapSearchButton} onPress={handleSearchLocation}>
                <Text style={styles.mapSearchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fullscreenMapWrapper}>
            <MapView
              ref={fullScreenMapRef}
              style={styles.fullscreenMap}
              initialRegion={region}
              region={region}
              onLongPress={handleAddBoundaryPoint}
              showsUserLocation
              showsMyLocationButton
            >
              {boundaryCoordinates.length > 0 && (
                <Polygon
                  coordinates={boundaryCoordinates}
                  strokeColor="#DC2626"
                  fillColor="rgba(220,38,38,0.2)"
                  strokeWidth={2}
                />
              )}

              {boundaryCoordinates.map((point, index) => (
                <Marker
                  key={`fs-boundary-${index}`}
                  coordinate={point}
                  pinColor="#F87171"
                  title={`Point ${index + 1}`}
                />
              ))}

              {previewVoters.map((voter) => {
                if (!voter.location || !Array.isArray(voter.location.coordinates)) {
                  return null
                }

                const [longitude, latitude] = voter.location.coordinates
                return (
                  <Marker
                    key={`fs-${voter._id}`}
                    coordinate={{ latitude, longitude }}
                    title={`${voter.firstName || ""} ${voter.lastName || ""}`.trim()}
                    description={voter.address || voter.streetName || ""}
                  />
                )
              })}
            </MapView>

            <View style={styles.fullscreenHint}>
              <Text style={styles.fullscreenHintText}>
                Long-press to drop boundary points. Adjust the polygon until it matches your desired route.
              </Text>
            </View>
          </View>

          <View style={styles.fullscreenActionBar}>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                boundaryPoints.length === 0 && styles.buttonDisabled,
              ]}
              onPress={handleUndoPoint}
              disabled={boundaryPoints.length === 0}
            >
              <Text style={styles.secondaryButtonText}>Undo Last Point</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                boundaryPoints.length === 0 && styles.buttonDisabled,
              ]}
              onPress={handleResetBoundary}
              disabled={boundaryPoints.length === 0}
            >
              <Text style={styles.secondaryButtonText}>Reset Boundary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.primaryActionButton,
                styles.previewButton,
                previewLoading && styles.buttonDisabled,
              ]}
              onPress={handlePreviewVoters}
              disabled={previewLoading}
            >
              {previewLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryActionButtonText}>Preview Voters</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.primaryActionButton,
                styles.applyBoundaryButton,
                styles.fullscreenDoneButton,
              ]}
              onPress={handleCloseFullScreenMap}
            >
              <Text style={styles.primaryActionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={statusModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStatusModal}
      >
        <View style={styles.statusModalOverlay}>
          <View style={styles.statusModalContent}>
            <Text style={styles.statusModalTitle}>Update Status</Text>
            {selectedVoter && (
              <Text style={styles.statusModalSubtitle}>
                {selectedVoter.firstName} {selectedVoter.lastName}
              </Text>
            )}

            <View style={styles.statusOptionsContainer}>
              {STATUS_OPTIONS.map((option) => {
                const isActive = selectedVoter?.status?.toLowerCase() === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.statusOption, isActive && styles.statusOptionActive]}
                    onPress={() => handleModalStatusUpdate(option.value)}
                    disabled={isUpdatingStatus}
                  >
                    <Text style={[styles.statusOptionText, isActive && styles.statusOptionTextActive]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.statusModalCloseButton}
              onPress={closeStatusModal}
              disabled={isUpdatingStatus}
            >
              <Text style={styles.statusModalCloseButtonText}>Cancel</Text>
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
    color: "#e1d9d9ff", // Red accent
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F9FAFB", // Light text
    marginLeft: 16,
  },
  routeIndicator: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    marginLeft: 16,
    alignSelf: "flex-start",
  },
  routeIndicatorText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1F2937", // Dark background
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statNumber: {
    fontSize: 28, // Larger numbers
    fontWeight: "bold",
    color: "#931b1bff", // Red numbers
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#D1D5DB", // Light gray text
    textAlign: "center",
    fontWeight: "500",
  },
  routesContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20, // Larger section title
    fontWeight: "bold",
    color: "#F9FAFB", // Light text
    marginBottom: 20,
  },
  routeCard: {
    backgroundColor: "#1F2937", // Dark background
    borderRadius: 16, // More rounded
    padding: 20, // More padding
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6, // Larger shadow
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  routeName: {
    fontSize: 18, // Larger route name
    fontWeight: "600",
    color: "#F9FAFB", // Light text
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priorityText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  routeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#374151", // Dark background
    borderRadius: 12,
    paddingVertical: 16,
  },
  routeStat: {
    alignItems: "center",
  },
  routeStatNumber: {
    fontSize: 20, // Larger numbers
    fontWeight: "bold",
    color: "#D1D5DB", // Red numbers
  },
  routeStatLabel: {
    fontSize: 12,
    color: "#D1D5DB", // Light gray text
    marginTop: 4,
  },
  routeStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#4B5563", // Gray divider
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  routeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  actionButtonText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
  },
  primaryActionButton: {
    backgroundColor: "#931b1bff", // Red primary button
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#931b1bff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryActionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  startRouteButton: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    minWidth: 88,
  },
  startRouteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  expandedRouteCard: {
    marginTop: 16,
    backgroundColor: "#0F172A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
    padding: 16,
  },
  expandedMapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  expandedMap: {
    flex: 1,
  },
  voterListTitle: {
    color: "#F9FAFB",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  voterList: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E293B",
    backgroundColor: "#111827",
  },
  voterListItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  voterListItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  voterName: {
    color: "#DC2626", // Red text to indicate it's clickable
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusPillText: {
    color: "#F8FAFC",
    fontWeight: "700",
    fontSize: 11,
  },
  voterAddressText: {
    color: "#CBD5F5",
    fontSize: 13,
  },
  voterMetaText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  generateButton: {
    backgroundColor: "#931b1bff", // Red background
    paddingVertical: 18, // More padding
    paddingHorizontal: 24,
    borderRadius: 16, // More rounded
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 2, // Added border
    borderColor: "#931b1bff", // Dark red border
    shadowColor: "#931b1bff", // Red shadow
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 18, // Larger text
    fontWeight: "bold", // Bolder text
    textAlign: "center",
  },
  generateButtonDescription: {
    color: "#E0F2FE",
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
  },
  createCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  createCardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F9FAFB",
    marginBottom: 4,
  },
  createCardSubtitle: {
    color: "#D1D5DB",
    marginBottom: 16,
    fontSize: 14,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: "#E5E7EB",
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#F9FAFB",
    fontSize: 16,
  },
  notesInput: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  prioritySelector: {
    flexDirection: "row",
    gap: 12,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4B5563",
    alignItems: "center",
  },
  priorityOptionSelected: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },
  priorityOptionText: {
    color: "#D1D5DB",
    fontWeight: "500",
  },
  priorityOptionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  mapToolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  mapSearchContainer: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#374151",
  },
  mapSearchInput: {
    flex: 1,
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#F9FAFB",
    borderRightWidth: 1,
    borderRightColor: "#374151",
  },
  mapSearchButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapSearchButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  fullscreenButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  fullscreenButtonText: {
    color: "#F9FAFB",
    fontWeight: "600",
  },
  mapContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#374151",
    height: 250,
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  boundaryHint: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(17,24,39,0.85)",
    borderRadius: 8,
    padding: 12,
  },
  boundaryHintText: {
    color: "#E5E7EB",
    fontSize: 12,
    textAlign: "center",
  },
  mapActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  previewList: {
    marginTop: 12,
    backgroundColor: "#0F172A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E293B",
    maxHeight: 200,
    overflow: "hidden",
  },
  previewListItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  previewVoterName: {
    color: "#F1F5F9",
    fontWeight: "600",
    marginBottom: 2,
  },
  previewVoterAddress: {
    color: "#CBD5F5",
    fontSize: 13,
  },
  previewVoterMeta: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 2,
  },
  secondaryButton: {
    flexGrow: 1,
    flexBasis: "30%",
    backgroundColor: "#374151",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  secondaryButtonText: {
    color: "#D1D5DB",
    fontWeight: "500",
  },
  previewButton: {
    flexGrow: 1,
    flexBasis: "30%",
    backgroundColor: "#16A34A",
  },
  previewSummary: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#14532D",
    borderWidth: 1,
    borderColor: "#15803D",
  },
  previewSummaryText: {
    color: "#BBF7D0",
    textAlign: "center",
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  formFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  cancelButtonText: {
    color: "#D1D5DB",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    flex: 1,
  },
  loadingCard: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  loadingText: {
    color: "#9CA3AF",
  },
  emptyCard: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  emptyText: {
    color: "#9CA3AF",
  },
  routeTitleRow: {
    flex: 1,
  },
  routeMetaText: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
  },
  routeTagGroup: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  fullscreenModalContainer: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 16,
  },
  fullscreenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  fullscreenTitle: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "700",
  },
  fullscreenCloseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#374151",
    borderRadius: 8,
  },
  fullscreenCloseButtonText: {
    color: "#D1D5DB",
    fontWeight: "600",
  },
  fullscreenToolbar: {
    marginBottom: 12,
  },
  fullscreenMapWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#374151",
  },
  fullscreenMap: {
    flex: 1,
  },
  fullscreenHint: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "rgba(17,24,39,0.85)",
    padding: 12,
    borderRadius: 8,
  },
  fullscreenHintText: {
    color: "#E5E7EB",
    textAlign: "center",
    fontSize: 13,
  },
  fullscreenActionBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  fullscreenDoneButton: {
    flexGrow: 1,
    flexBasis: "40%",
  },
  applyBoundaryButton: {
    backgroundColor: "#DC2626",
  },
  statusModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  statusModalContent: {
    width: "100%",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
  },
  statusModalTitle: {
    color: "#F9FAFB",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statusModalSubtitle: {
    color: "#D1D5DB",
    marginBottom: 16,
    fontSize: 16,
  },
  statusOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statusOption: {
    flexGrow: 1,
    flexBasis: "45%",
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
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
    fontSize: 15,
  },
  statusOptionTextActive: {
    color: "#FCD34D",
    fontWeight: "600",
  },
  statusModalCloseButton: {
    marginTop: 20,
    backgroundColor: "#374151",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statusModalCloseButtonText: {
    color: "#E5E7EB",
    fontWeight: "600",
  },
})
