// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function ForgotPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState("")

//   const handleResetPassword = () => {
//     Alert.alert("Reset Link Sent", "A password reset link has been sent to your email address.", [
//       { text: "OK", onPress: () => navigation.navigate("Login") },
//     ])
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <View style={styles.iconCircle}>
//             <Text style={styles.iconText}>🔒</Text>
//           </View>
//           <Text style={styles.title}>Reset Password</Text>
//           <Text style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
//           <Text style={styles.resetButtonText}>Reset Password</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//           <Text style={styles.backLink}>Back to Login</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 48,
//   },
//   iconCircle: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#3B82F6",
//     borderRadius: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   iconText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
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
//   formContainer: {
//     gap: 16,
//     marginBottom: 32,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     color: "#374151",
//     fontWeight: "500",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     color: "#1F2937",
//     fontSize: 16,
//   },
//   resetButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   resetButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   backLink: {
//     color: "#3B82F6",
//     textAlign: "center",
//     fontWeight: "500",
//   },
// })





"use client"

import { useState } from "react"
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from 'axios'; // Import axios
import { BaseUrl } from '../../BaseUrl'; // Import BaseUrl

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("")

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    try {
      const response = await axios.post(`${BaseUrl}/user/forgot-password`, {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response?.data?.success) {
        Alert.alert("Success", response.data.message);
        navigation.navigate("OtpVerification", { email });
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Forgot password request error:", error.message);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
           <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>CAMPAIGN HELPER</Text>
          <Text style={styles.subtitle}>Reset your password to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.backLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090a0aff", // Dark background
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop:40
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    // Added logo styling
    width: 220,
    height: 220
  },
  welcomeText: {
    // Added welcome text
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#9CA3AF", // Gray subtitle
    textAlign: "center",
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
  borderColor: "#374151",
    backgroundColor: "#17181aff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16, // More padding
    color: "#FFFFFF", // White text
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#931b1bff", // Red button
    paddingVertical: 18, // More padding
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: "#c41919ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  backLink: {
    color: "#9CA3AF", // Gray text
    textAlign: "center",
    fontSize: 16,
  },
})