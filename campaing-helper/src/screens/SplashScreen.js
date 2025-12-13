// import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { LinearGradient } from "expo-linear-gradient"

// export default function SplashScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient colors={["#3b82f6", "#1d4ed8"]} style={styles.gradient}>
//         <View style={styles.logoContainer}>
//           <View style={styles.logoCircle}>
//             <Text style={styles.logoText}>CH</Text>
//           </View>
//           <Text style={styles.title}>Campaign Helper</Text>
//           <Text style={styles.subtitle}>Your Complete Campaign Manager</Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
//             <Text style={styles.signUpButtonText}>Create Account</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.navigate("Subscription")}>
//             <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 24,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 48,
//   },
//   logoCircle: {
//     width: 96,
//     height: 96,
//     backgroundColor: "white",
//     borderRadius: 48,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   logoText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#3B82F6",
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 20,
//     color: "#DBEAFE",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 16,
//   },
//   loginButton: {
//     backgroundColor: "white",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 8,
//   },
//   loginButtonText: {
//     color: "#3B82F6",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   signUpButton: {
//     borderWidth: 2,
//     borderColor: "white",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 8,
//   },
//   signUpButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   subscribeButton: {
//     backgroundColor: "#FBBF24",
//     paddingVertical: 16,
//     paddingHorizontal: 32,
//     borderRadius: 8,
//   },
//   subscribeButtonText: {
//     color: "#374151",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// })


import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>CAMPAIGN HELPER</Text>
          <Text style={styles.subtitle}>Your Campaign, Simplified</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginButtonText}>🔑 Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupButtonText}>📝 Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate("Subscription")}>
            <Text style={styles.guestButtonText}>👤 Subscribe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Empowering campaigns with smart technology</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 0,
    alignItems: "flex-start"
   
  },
  logo: {
    width: 220,
    height: 220,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    color: "#D1D5DB", // Light gray text
    marginBottom: 8,
    fontWeight: "300",
  },
  appName: {
    fontSize: 25, // Larger app name
    fontWeight: "bold",
    color: "#F9FAFB", // White text
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 2, // Added letter spacing
  },
  subtitle: {
    fontSize: 18,
    color: "#931b1bff", // Red subtitle
    textAlign: "center",
    fontWeight: "500", // Medium weight
  },
  buttonContainer: {
    width: "100%",
    gap: 16, // Consistent gap
  },
  loginButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12, // More rounded
    alignItems: "center",
    shadowColor: "#931b1bff", // Red shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#374151", // Dark gray button
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12, // More rounded
    alignItems: "center",
    borderWidth: 2, // Added border
    borderColor: "#931b1bff", // Red border
    shadowColor: "#000", // Added shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  signupButtonText: {
    color: "#f4f2f2ff", // Red text
    fontSize: 18,
    fontWeight: "600",
  },
  guestButton: {
    backgroundColor: "transparent", // Transparent background
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12, // More rounded
    alignItems: "center",
    borderWidth: 1, // Added border
    borderColor: "#4B5563", // Gray border
  },
  guestButtonText: {
    color: "#9CA3AF", // Gray text
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280", // Gray text
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic", // Italic text
  },
})
