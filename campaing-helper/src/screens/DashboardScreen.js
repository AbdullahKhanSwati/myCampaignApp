// import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import { BarChart, LineChart, PieChart } from "react-native-chart-kit"
// import { SafeAreaView } from "react-native-safe-area-context"

// const screenWidth = Dimensions.get("window").width

// export default function DashboardScreen({ navigation }) {
//   const stats = {
//     totalVoters: 15420,
//     knockedVoters: 3240,
//     supporters: 1850,
//     opposed: 420,
//     undecided: 970,
//     moved: 180,
//   }

//   const daysUntilElection = 45

//   const voterStatusData = {
//     labels: ["Supporters", "Opposed", "Undecided", "Moved"],
//     datasets: [
//       {
//         data: [stats.supporters, stats.opposed, stats.undecided, stats.moved],
//       },
//     ],
//   }

//   const pieChartData = [
//     {
//       name: "Supporters",
//       population: stats.supporters,
//       color: "#059669",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Opposed",
//       population: stats.opposed,
//       color: "#DC2626",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Undecided",
//       population: stats.undecided,
//       color: "#CA8A04",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Moved",
//       population: stats.moved,
//       color: "#6B7280",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//   ]

//   const progressData = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         data: [450, 820, 1240, 1850],
//         strokeWidth: 3,
//       },
//     ],
//   }

//   const chartConfig = {
//     backgroundColor: "#FFFFFF",
//     backgroundGradientFrom: "#FFFFFF",
//     backgroundGradientTo: "#FFFFFF",
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: "6",
//       strokeWidth: "2",
//       stroke: "#3B82F6",
//     },
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.welcomeText}>Welcome Back!</Text>
//               <Text style={styles.campaignText}>Springfield Mayor Campaign</Text>
//             </View>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Text style={styles.menuIcon}>☰</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.electionCountdown}>
//             <Text style={styles.countdownText}>{daysUntilElection} Days Until Election</Text>
//             <Text style={styles.electionDate}>November 5, 2024</Text>
//           </View>
//         </View>

//         {/* Key Stats Cards */}
//         <View style={styles.statsSection}>
//           <Text style={styles.sectionTitle}>Campaign Overview</Text>
//           <View style={styles.keyStatsRow}>
//             <View style={[styles.keyStatCard, styles.primaryCard]}>
//               <Text style={styles.keyStatNumber}>{stats.totalVoters.toLocaleString()}</Text>
//               <Text style={styles.keyStatLabel}>Total Voters</Text>
//             </View>
//             <View style={[styles.keyStatCard, styles.successCard]}>
//               <Text style={styles.keyStatNumber}>{stats.knockedVoters.toLocaleString()}</Text>
//               <Text style={styles.keyStatLabel}>Contacted</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Voter Status Breakdown</Text>
//           <View style={styles.chartContainer}>
//             <BarChart
//               data={voterStatusData}
//               width={screenWidth - 48}
//               height={220}
//               chartConfig={chartConfig}
//               style={styles.chart}
//               showValuesOnTopOfBars={true}
//               fromZero={true}
//             />
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Voter Distribution</Text>
//           <View style={styles.chartContainer}>
//             <PieChart
//               data={pieChartData}
//               width={screenWidth -62}
//               height={220}
//               chartConfig={chartConfig}
//               accessor="population"
//               backgroundColor="transparent"
//               paddingLeft="5"
//               style={styles.chart}
//             />
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Supporter Growth</Text>
//           <View style={styles.chartContainer}>
//             <LineChart
//               data={progressData}
//               width={screenWidth - 48}
//               height={220}
//               chartConfig={chartConfig}
//               style={styles.chart}
//               bezier
//             />
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.actionsSection}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionsList}>
//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("VoterList")}>
//               <Text style={styles.actionIcon}>👥</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Voter List</Text>
//                 <Text style={styles.actionSubtitle}>View and manage all voters</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Canvassing")}>
//               <Text style={styles.actionIcon}>🗺️</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Canvassing Routes</Text>
//                 <Text style={styles.actionSubtitle}>Plan your door-to-door routes</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Notes")}>
//               <Text style={styles.actionIcon}>📝</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Notes & Details</Text>
//                 <Text style={styles.actionSubtitle}>Voter notes and interactions</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Volunteer")}>
//               <Text style={styles.actionIcon}>🤝</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Volunteer Access</Text>
//                 <Text style={styles.actionSubtitle}>Manage team members</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>
//           </View>
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
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: "#3B82F6",
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   welcomeText: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   campaignText: {
//     color: "#DBEAFE",
//   },
//   menuIcon: {
//     color: "#FFFFFF",
//     fontSize: 24,
//   },
//   electionCountdown: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     borderRadius: 8,
//     padding: 16,
//   },
//   countdownText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   electionDate: {
//     color: "#DBEAFE",
//     textAlign: "center",
//   },
//   statsSection: {
//     paddingHorizontal: 24,
//     paddingVertical: 24,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginBottom: 16,
//   },
//   keyStatsRow: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   keyStatCard: {
//     flex: 1,
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//   },
//   primaryCard: {
//     backgroundColor: "#3B82F6",
//   },
//   successCard: {
//     backgroundColor: "#059669",
//   },
//   keyStatNumber: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   keyStatLabel: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     opacity: 0.9,
//   },
//   chartSection: {
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//   },
//   chartContainer: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   chart: {
//     borderRadius: 16,
//   },
//   actionsSection: {
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//   },
//   actionsList: {
//     gap: 12,
//   },
//   actionCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 8,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionIcon: {
//     fontSize: 24,
//     marginRight: 16,
//   },
//   actionContent: {
//     flex: 1,
//   },
//   actionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//   },
//   actionSubtitle: {
//     color: "#6B7280",
//   },
//   actionArrow: {
//     color: "#9CA3AF",
//     fontSize: 18,
//   },
// })


// import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// import { BarChart, LineChart, PieChart } from "react-native-chart-kit"
// import { SafeAreaView } from "react-native-safe-area-context"

// const screenWidth = Dimensions.get("window").width

// export default function DashboardScreen({ navigation }) {
//   const stats = {
//     totalVoters: 15420,
//     knockedVoters: 3240,
//     supporters: 1850,
//     opposed: 420,
//     undecided: 970,
//     moved: 180,
//   }

//   const daysUntilElection = 45

//   const voterStatusData = {
//     labels: ["Supporters", "Opposed", "Undecided", "Moved"],
//     datasets: [
//       {
//         data: [stats.supporters, stats.opposed, stats.undecided, stats.moved],
//       },
//     ],
//   }

//   const pieChartData = [
//     {
//       name: "Supporters",
//       population: stats.supporters,
//       color: "#059669",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Opposed",
//       population: stats.opposed,
//       color: "#DC2626",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Undecided",
//       population: stats.undecided,
//       color: "#CA8A04",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//     {
//       name: "Moved",
//       population: stats.moved,
//       color: "#6B7280",
//       legendFontColor: "#1F2937",
//       legendFontSize: 14,
//     },
//   ]

//   const progressData = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         data: [450, 820, 1240, 1850],
//         strokeWidth: 3,
//       },
//     ],
//   }

//   const chartConfig = {
//     backgroundColor: "#FFFFFF",
//     backgroundGradientFrom: "#FFFFFF",
//     backgroundGradientTo: "#FFFFFF",
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     propsForDots: {
//       r: "6",
//       strokeWidth: "2",
//       stroke: "#3B82F6",
//     },
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.welcomeText}>Welcome Back!</Text>
//               <Text style={styles.campaignText}>Springfield Mayor Campaign</Text>
//             </View>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Text style={styles.menuIcon}>☰</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.electionCountdown}>
//             <Text style={styles.countdownText}>{daysUntilElection} Days Until Election</Text>
//             <Text style={styles.electionDate}>November 5, 2024</Text>
//           </View>
//         </View>

//         {/* Key Stats Cards */}
//         <View style={styles.statsSection}>
//           <Text style={styles.sectionTitle}>Campaign Overview</Text>
//           <View style={styles.keyStatsRow}>
//             <View style={[styles.keyStatCard, styles.primaryCard]}>
//               <Text style={styles.keyStatNumber}>{stats.totalVoters.toLocaleString()}</Text>
//               <Text style={styles.keyStatLabel}>Total Voters</Text>
//             </View>
//             <View style={[styles.keyStatCard, styles.successCard]}>
//               <Text style={styles.keyStatNumber}>{stats.knockedVoters.toLocaleString()}</Text>
//               <Text style={styles.keyStatLabel}>Contacted</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Voter Status Breakdown</Text>
//           <View style={styles.chartContainer}>
//             <BarChart
//               data={voterStatusData}
//               width={screenWidth - 48}
//               height={220}
//               chartConfig={chartConfig}
//               style={styles.chart}
//               showValuesOnTopOfBars={true}
//               fromZero={true}
//             />
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Voter Distribution</Text>
//           <View style={styles.chartContainer}>
//             <PieChart
//               data={pieChartData}
//               width={screenWidth - 62}
//               height={220}
//               chartConfig={chartConfig}
//               accessor="population"
//               backgroundColor="transparent"
//               paddingLeft="5"
//               style={styles.chart}
//             />
//           </View>
//         </View>

//         <View style={styles.chartSection}>
//           <Text style={styles.sectionTitle}>Supporter Growth</Text>
//           <View style={styles.chartContainer}>
//             <LineChart
//               data={progressData}
//               width={screenWidth - 48}
//               height={220}
//               chartConfig={chartConfig}
//               style={styles.chart}
//               bezier
//             />
//           </View>
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.actionsSection}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionsList}>
//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("VoterList")}>
//               <Text style={styles.actionIcon}>👥</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Voter List</Text>
//                 <Text style={styles.actionSubtitle}>View and manage all voters</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Canvassing")}>
//               <Text style={styles.actionIcon}>🗺️</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Canvassing Routes</Text>
//                 <Text style={styles.actionSubtitle}>Plan your door-to-door routes</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Notes")}>
//               <Text style={styles.actionIcon}>📝</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Notes & Details</Text>
//                 <Text style={styles.actionSubtitle}>Voter notes and interactions</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Volunteer")}>
//               <Text style={styles.actionIcon}>🤝</Text>
//               <View style={styles.actionContent}>
//                 <Text style={styles.actionTitle}>Volunteer Access</Text>
//                 <Text style={styles.actionSubtitle}>Manage team members</Text>
//               </View>
//               <Text style={styles.actionArrow}>›</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#111827", // Dark background
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: "#931b1bff", // Red header
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   welcomeText: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   campaignText: {
//     color: "#FCA5A5", // Light red text
//   },
//   menuIcon: {
//     color: "#FFFFFF",
//     fontSize: 24,
//   },
//   electionCountdown: {
//     backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay
//     borderRadius: 8,
//     padding: 16,
//   },
//   countdownText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   electionDate: {
//     color: "#FCA5A5", // Light red text
//     textAlign: "center",
//   },
//   statsSection: {
//     paddingHorizontal: 24,
//     paddingVertical: 24,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#FFFFFF", // White text
//     marginBottom: 16,
//   },
//   keyStatsRow: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   keyStatCard: {
//     flex: 1,
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//   },
//   primaryCard: {
//     backgroundColor: "#931b1bff", // Red primary card
//   },
//   successCard: {
//     backgroundColor: "#1F2937", // Dark success card
//     borderWidth: 1,
//     borderColor: "#374151",
//   },
//   keyStatNumber: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   keyStatLabel: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     opacity: 0.9,
//   },
//   chartSection: {
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//   },
//   chartContainer: {
//     backgroundColor: "#1F2937", // Dark chart background
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#374151", // Dark border
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   chart: {
//     borderRadius: 16,
//   },
//   actionsSection: {
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//   },
//   actionsList: {
//     gap: 12,
//   },
//   actionCard: {
//     backgroundColor: "#1F2937", // Dark action card
//     borderRadius: 8,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#374151", // Dark border
//   },
//   actionIcon: {
//     fontSize: 24,
//     marginRight: 16,
//   },
//   actionContent: {
//     flex: 1,
//   },
//   actionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#FFFFFF", // White text
//   },
//   actionSubtitle: {
//     color: "#9CA3AF", // Gray text
//   },
//   actionArrow: {
//     color: "#DC2626", // Red arrow
//     fontSize: 18,
//   },
// })



import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import {
  BarChart,
  LineChart,
  PieChart,
} from "react-native-chart-kit"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Toast from "react-native-toast-message"
import BaseUrl from "../../BaseUrl"

const screenWidth = Dimensions.get("window").width

export default function DashboardScreen({ navigation }) {
  const [isVolunteer, setIsVolunteer] = useState(false)
  const [hasSelectedRoute, setHasSelectedRoute] = useState(false)
  const [campaign, setCampaign] = useState(null)
  const [stats, setStats] = useState({
    totalVoters: 0,
    knockedVoters: 0,
    supporters: 0,
    opposed: 0,
    undecided: 0,
    moved: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(false)
  const [daysUntilElection, setDaysUntilElection] = useState(0)
  const [electionDate, setElectionDate] = useState(null)

  const loadVolunteerStatus = async () => {
    try {
      const volunteerStatus = await AsyncStorage.getItem("isVolunteer")
      const hasRoute = await AsyncStorage.getItem("hasSelectedRoute")
      
      const userIsVolunteer = volunteerStatus === "true"
      setIsVolunteer(userIsVolunteer)
      
      // Set route selection status
      if (userIsVolunteer) {
        setHasSelectedRoute(hasRoute === "true")
      } else {
        setHasSelectedRoute(true) // Non-volunteers always have access
      }
    } catch (error) {
      console.error("Error loading volunteer status:", error)
    }
  }

  // Load status when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadVolunteerStatus()
    }, [])
  )

  // Also load on initial mount
  useEffect(() => {
    loadVolunteerStatus()
  }, [])

  const fetchCampaignData = useCallback(async () => {
    try {
      const storedCampaign = await AsyncStorage.getItem("currentCampaign")
      if (storedCampaign) {
        const campaignData = JSON.parse(storedCampaign)
        setCampaign(campaignData)
        
        // Set election date
        if (campaignData.electionDate) {
          const election = new Date(campaignData.electionDate)
          setElectionDate(election)
          
          // Calculate days until election
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          election.setHours(0, 0, 0, 0)
          const diffTime = election - today
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          setDaysUntilElection(diffDays >= 0 ? diffDays : 0)
        }
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error)
    }
  }, [])

  const fetchVoterStats = useCallback(async () => {
    try {
      setIsLoadingStats(true)
      const storedCampaign = await AsyncStorage.getItem("currentCampaign")
      const selectedRoute = await AsyncStorage.getItem('selectedVolunteerRoute')
      
      if (!storedCampaign) {
        setStats({
          totalVoters: 0,
          knockedVoters: 0,
          supporters: 0,
          opposed: 0,
          undecided: 0,
          moved: 0,
        })
        return
      }

      const campaignData = JSON.parse(storedCampaign)
      const campaignId = campaignData._id || campaignData.id
      
      // Build query params
      const params = { campaignId }
      
      // If volunteer has selected route, filter by route
      if (selectedRoute) {
        const routeData = JSON.parse(selectedRoute)
        if (routeData.routeId) {
          params.routeId = routeData.routeId
        }
      }
      
      // Fetch voter stats
      const statsResponse = await axios.get(`${BaseUrl}/voter/stats`, { params })
      
      if (statsResponse.data?.success) {
        const voterStats = statsResponse.data.data
        
        // Calculate contacted voters (yes + no + moved)
        const contacted = (voterStats.yes || 0) + (voterStats.no || 0) + (voterStats.moved || 0)
        
        setStats({
          totalVoters: voterStats.total || 0,
          knockedVoters: contacted,
          supporters: voterStats.yes || 0,
          opposed: voterStats.no || 0,
          undecided: voterStats.undecided || 0,
          moved: voterStats.moved || 0,
        })
      } else {
        setStats({
          totalVoters: 0,
          knockedVoters: 0,
          supporters: 0,
          opposed: 0,
          undecided: 0,
          moved: 0,
        })
      }
    } catch (error) {
      console.error("Error fetching voter stats:", error)
      setStats({
        totalVoters: 0,
        knockedVoters: 0,
        supporters: 0,
        opposed: 0,
        undecided: 0,
        moved: 0,
      })
    } finally {
      setIsLoadingStats(false)
    }
  }, [])

  // Fetch data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchCampaignData()
      fetchVoterStats()
    }, [fetchCampaignData, fetchVoterStats])
  )

  // Also fetch on initial mount
  useEffect(() => {
    fetchCampaignData()
    fetchVoterStats()
  }, [fetchCampaignData, fetchVoterStats])

  // ✅ Chart data must be in correct structure - using dynamic stats
  const voterStatusData = {
    labels: ["Supporters", "Opposed", "Undecided", "Moved"],
    datasets: [
      {
        data: [
          stats.supporters,
          stats.opposed,
          stats.undecided,
          stats.moved,
        ],
      },
    ],
  }

  const pieChartData = [
    {
      name: "Supporters",
      population: stats.supporters,
      color: "#059669",
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
    {
      name: "Opposed",
      population: stats.opposed,
      color: "#DC2626",
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
    {
      name: "Undecided",
      population: stats.undecided,
      color: "#CA8A04",
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
    {
      name: "Moved",
      population: stats.moved,
      color: "#6B7280",
      legendFontColor: "#FFFFFF",
      legendFontSize: 14,
    },
  ]

  // Progress data - showing supporter growth over time
  // For now, using current stats. Can be enhanced with historical data later
  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [
          Math.round(stats.supporters * 0.25),
          Math.round(stats.supporters * 0.5),
          Math.round(stats.supporters * 0.75),
          stats.supporters,
        ],
        strokeWidth: 3,
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: "#1F2937",
    backgroundGradientTo: "#1F2937",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(220, 38, 38, ${opacity})`, // Red theme
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#FFFFFF",
    },
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.campaignText}>
                {campaign ? `${campaign.type || "Campaign"} - ${campaign.city || ""}` : "Campaign"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.electionCountdown}>
            <Text style={styles.countdownText}>
              {daysUntilElection} Days Until Election
            </Text>
            <Text style={styles.electionDate}>
              {electionDate ? electionDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "No date set"}
            </Text>
          </View>
        </View>

        {/* Key Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Campaign Overview</Text>
          <View style={styles.keyStatsRow}>
            <View style={[styles.keyStatCard, styles.primaryCard]}>
              <Text style={styles.keyStatNumber}>
                {isLoadingStats ? "..." : stats.totalVoters.toLocaleString()}
              </Text>
              <Text style={styles.keyStatLabel}>Total Voters</Text>
            </View>
            <View style={[styles.keyStatCard, styles.successCard]}>
              <Text style={styles.keyStatNumber}>
                {isLoadingStats ? "..." : stats.knockedVoters.toLocaleString()}
              </Text>
              <Text style={styles.keyStatLabel}>Contacted</Text>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Voter Status Breakdown</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={voterStatusData}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
            />
          </View>
        </View>

        {/* Pie Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Voter Distribution</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieChartData}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="12"
              style={styles.chart}
              absolute
            />
          </View>
        </View>

        {/* Line Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Supporter Growth</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={progressData}
              width={screenWidth - 48}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              bezier
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <TouchableOpacity
              style={[
                styles.actionCard,
                (isVolunteer && !hasSelectedRoute) && styles.actionCardDisabled
              ]}
              onPress={() => {
                if (!(isVolunteer && !hasSelectedRoute)) {
                  navigation.navigate("VoterList")
                }
              }}
              disabled={isVolunteer && !hasSelectedRoute}
            >
              <Text style={[
                styles.actionIcon,
                (isVolunteer && !hasSelectedRoute) && styles.actionIconDisabled
              ]}>👥</Text>
              <View style={styles.actionContent}>
                <Text style={[
                  styles.actionTitle,
                  (isVolunteer && !hasSelectedRoute) && styles.actionTitleDisabled
                ]}>Voter List</Text>
                <Text style={[
                  styles.actionSubtitle,
                  (isVolunteer && !hasSelectedRoute) && styles.actionSubtitleDisabled
                ]}>
                  View and manage all voters
                </Text>
              </View>
              <Text style={[
                styles.actionArrow,
                (isVolunteer && !hasSelectedRoute) && styles.actionArrowDisabled
              ]}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionCard,
                (isVolunteer && !hasSelectedRoute) && styles.actionCardDisabled
              ]}
              onPress={() => {
                if (!(isVolunteer && !hasSelectedRoute)) {
                  navigation.navigate("Canvassing")
                }
              }}
              disabled={isVolunteer && !hasSelectedRoute}
            >
              <Text style={[
                styles.actionIcon,
                (isVolunteer && !hasSelectedRoute) && styles.actionIconDisabled
              ]}>🗺️</Text>
              <View style={styles.actionContent}>
                <Text style={[
                  styles.actionTitle,
                  (isVolunteer && !hasSelectedRoute) && styles.actionTitleDisabled
                ]}>Canvassing Routes</Text>
                <Text style={[
                  styles.actionSubtitle,
                  (isVolunteer && !hasSelectedRoute) && styles.actionSubtitleDisabled
                ]}>
                  Plan your door-to-door routes
                </Text>
              </View>
              <Text style={[
                styles.actionArrow,
                (isVolunteer && !hasSelectedRoute) && styles.actionArrowDisabled
              ]}>›</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[
                styles.actionCard,
                isVolunteer && styles.actionCardDisabled
              ]}
              onPress={() => {
                if (!isVolunteer) {
                  navigation.navigate("Volunteer")
                }
              }}
              disabled={isVolunteer}
            >
              <Text style={[
                styles.actionIcon,
                isVolunteer && styles.actionIconDisabled
              ]}>🤝</Text>
              <View style={styles.actionContent}>
                <Text style={[
                  styles.actionTitle,
                  isVolunteer && styles.actionTitleDisabled
                ]}>Volunteer Access</Text>
                <Text style={[
                  styles.actionSubtitle,
                  isVolunteer && styles.actionSubtitleDisabled
                ]}>
                  Manage team members
                </Text>
              </View>
              <Text style={[
                styles.actionArrow,
                isVolunteer && styles.actionArrowDisabled
              ]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#931b1bff",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  campaignText: {
    color: "#FCA5A5",
  },
  menuIcon: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  electionCountdown: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  countdownText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  electionDate: {
    color: "#FCA5A5",
    textAlign: "center",
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  keyStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  keyStatCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  primaryCard: {
    backgroundColor: "#931b1bff",
  },
  successCard: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
  },
  keyStatNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  keyStatLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },
  chartSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  chartContainer: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
  actionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionsList: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  actionSubtitle: {
    color: "#9CA3AF",
  },
  actionArrow: {
    color: "#DC2626",
    fontSize: 18,
  },
  actionCardDisabled: {
    opacity: 0.4,
    backgroundColor: "#111827", // Darker background when disabled
  },
  actionIconDisabled: {
    opacity: 0.4,
  },
  actionTitleDisabled: {
    opacity: 0.4,
  },
  actionSubtitleDisabled: {
    opacity: 0.4,
  },
  actionArrowDisabled: {
    opacity: 0.4,
  },
})
