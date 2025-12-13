// "use client"

// import { useState } from "react"
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function SubscriptionScreen({ navigation }) {
//   const [selectedPlan, setSelectedPlan] = useState("monthly")

//   const handleSubscribe = () => {
//     // Frontend only - navigate to onboarding
//     navigation.navigate("Onboarding")
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Choose Your Plan</Text>
//           <Text style={styles.subtitle}>Unlock the full power of Campaign Helper</Text>
//         </View>

//         <View style={styles.plansContainer}>
//           <TouchableOpacity
//             style={[styles.planCard, selectedPlan === "monthly" ? styles.selectedPlan : styles.unselectedPlan]}
//             onPress={() => setSelectedPlan("monthly")}
//           >
//             <View style={styles.planHeader}>
//               <Text style={styles.planTitle}>Monthly Plan</Text>
//               <Text style={styles.planPrice}>$49</Text>
//             </View>
//             <Text style={styles.planDescription}>Perfect for single campaigns</Text>
//             <View style={styles.featuresList}>
//               <Text style={styles.feature}>✓ Unlimited voter management</Text>
//               <Text style={styles.feature}>✓ Canvassing route planner</Text>
//               <Text style={styles.feature}>✓ Campaign analytics</Text>
//               <Text style={styles.feature}>✓ Email support</Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.planCard, selectedPlan === "annual" ? styles.selectedPlan : styles.unselectedPlan]}
//             onPress={() => setSelectedPlan("annual")}
//           >
//             <View style={styles.planHeader}>
//               <Text style={styles.planTitle}>Annual Plan</Text>
//               <View style={styles.priceContainer}>
//                 <Text style={styles.planPrice}>$399</Text>
//                 <Text style={styles.savings}>Save $189</Text>
//               </View>
//             </View>
//             <Text style={styles.planDescription}>Best value for ongoing campaigns</Text>
//             <View style={styles.featuresList}>
//               <Text style={styles.feature}>✓ Everything in Monthly</Text>
//               <Text style={styles.feature}>✓ Priority support</Text>
//               <Text style={styles.feature}>✓ Advanced analytics</Text>
//               <Text style={styles.feature}>✓ Team collaboration</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.paymentSection}>
//           <Text style={styles.paymentTitle}>Payment Methods</Text>
//           <View style={styles.paymentMethods}>
//             <View style={styles.paymentMethod}>
//               <Text style={styles.paymentText}>💳 Credit Card</Text>
//             </View>
//             <View style={styles.paymentMethod}>
//               <Text style={styles.paymentText}>🅿️ PayPal</Text>
//             </View>
//             <View style={styles.paymentMethod}>
//               <Text style={styles.paymentText}>🍎 Apple Pay</Text>
//             </View>
//             <View style={styles.paymentMethod}>
//               <Text style={styles.paymentText}>🤖 Google Pay</Text>
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
//           <Text style={styles.subscribeButtonText}>Subscribe & Continue</Text>
//         </TouchableOpacity>

//         <Text style={styles.disclaimer}>By subscribing, you agree to our Terms of Service and Privacy Policy</Text>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   scrollView: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 32,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#1F2937",
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: "#6B7280",
//     textAlign: "center",
//   },
//   plansContainer: {
//     gap: 16,
//     marginBottom: 32,
//   },
//   planCard: {
//     borderWidth: 2,
//     borderRadius: 8,
//     padding: 24,
//   },
//   selectedPlan: {
//     borderColor: "#3B82F6",
//     backgroundColor: "#EFF6FF",
//   },
//   unselectedPlan: {
//     borderColor: "#D1D5DB",
//   },
//   planHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   planTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1F2937",
//   },
//   planPrice: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#3B82F6",
//   },
//   priceContainer: {
//     alignItems: "flex-end",
//   },
//   savings: {
//     fontSize: 14,
//     color: "#059669",
//     fontWeight: "500",
//   },
//   planDescription: {
//     color: "#6B7280",
//   },
//   featuresList: {
//     marginTop: 16,
//     gap: 8,
//   },
//   feature: {
//     color: "#374151",
//   },
//   paymentSection: {
//     marginBottom: 32,
//   },
//   paymentTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 16,
//   },
//   paymentMethods: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },
//   paymentMethod: {
//     backgroundColor: "#F3F4F6",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   paymentText: {
//     color: "#374151",
//     fontWeight: "500",
//   },
//   subscribeButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   subscribeButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: "#6B7280",
//     textAlign: "center",
//   },
// })





"use client"

import { useState } from "react"
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SubscriptionScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  const handleSubscribe = () => {
    // Frontend only - navigate to onboarding
    navigation.navigate("Onboarding")
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
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>Unlock the full power of Campaign Helper</Text>
        </View>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === "monthly" ? styles.selectedPlan : styles.unselectedPlan]}
            onPress={() => setSelectedPlan("monthly")}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>Monthly Plan</Text>
              <Text style={styles.planPrice}>$49</Text>
            </View>
            <Text style={styles.planDescription}>Perfect for single campaigns</Text>
            <View style={styles.featuresList}>
              <Text style={styles.feature}>✓ Unlimited voter management</Text>
              <Text style={styles.feature}>✓ Canvassing route planner</Text>
              <Text style={styles.feature}>✓ Campaign analytics</Text>
              <Text style={styles.feature}>✓ Email support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, selectedPlan === "annual" ? styles.selectedPlan : styles.unselectedPlan]}
            onPress={() => setSelectedPlan("annual")}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>Annual Plan</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.planPrice}>$399</Text>
                <Text style={styles.savings}>Save $189</Text>
              </View>
            </View>
            <Text style={styles.planDescription}>Best value for ongoing campaigns</Text>
            <View style={styles.featuresList}>
              <Text style={styles.feature}>✓ Everything in Monthly</Text>
              <Text style={styles.feature}>✓ Priority support</Text>
              <Text style={styles.feature}>✓ Advanced analytics</Text>
              <Text style={styles.feature}>✓ Team collaboration</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentText}>💳 Credit Card</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentText}>🅿️ PayPal</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentText}>🍎 Apple Pay</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentText}>🤖 Google Pay</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>Subscribe & Continue</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>By subscribing, you agree to our Terms of Service and Privacy Policy</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
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
  },
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    backgroundColor: "#1F2937", // Dark card background
  },
  selectedPlan: {
    borderColor: "#931b1bff", // Red selected border
    backgroundColor: "#1F2937",
  },
  unselectedPlan: {
    borderColor: "#374151", // Dark unselected border
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#931b1bff", // Red price
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  savings: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "500",
  },
  planDescription: {
    color: "#9CA3AF", // Gray text
  },
  featuresList: {
    marginTop: 16,
    gap: 8,
  },
  feature: {
    color: "#FFFFFF", // White text
  },
  paymentSection: {
    marginBottom: 32,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF", // White text
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  paymentMethod: {
    backgroundColor: "#374151", // Dark payment method background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  paymentText: {
    color: "#FFFFFF", // White text
    fontWeight: "500",
  },
  subscribeButton: {
    backgroundColor: "#931b1bff", // Red subscribe button
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  subscribeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 12,
    color: "#9CA3AF", // Gray text
    textAlign: "center",
  },
})
