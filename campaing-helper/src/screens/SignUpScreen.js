// "use client"

// import { useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   const handleSignUp = () => {
//     // Frontend only - navigate to subscription
//     navigation.navigate("Subscription")
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.header}>
//           <View style={styles.logoCircle}>
//             <Text style={styles.logoText}>CH</Text>
//           </View>
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>Join thousands of successful campaigns</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Full Name</Text>
//             <TextInput style={styles.input} placeholder="Enter your full name" value={name} onChangeText={setName} />
//           </View>

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

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Create a password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Confirm Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry
//             />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//           <Text style={styles.signUpButtonText}>Create Account</Text>
//         </TouchableOpacity>

//         <View style={styles.loginLink}>
//           <Text style={styles.loginText}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.loginLinkText}>Login</Text>
//           </TouchableOpacity>
//         </View>
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
//     paddingTop: 48,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 48,
//   },
//   logoCircle: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#3B82F6",
//     borderRadius: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   logoText: {
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
//   signUpButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginBottom: 24,
//   },
//   signUpButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   loginLink: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   loginText: {
//     color: "#6B7280",
//   },
//   loginLinkText: {
//     color: "#3B82F6",
//     fontWeight: "500",
//   },
// })











// "use client"

// import { useState } from "react"
// import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"


// export default function SignUpScreen({ navigation }) {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   const handleSignUp = () => {
//     // Frontend only - navigate to subscription
//     navigation.navigate("Subscription")
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
//           <Text style={styles.welcomeText}>Welcome to</Text>
//           <Text style={styles.title}>CAMPAIGN HELPER</Text>
//           {/* <Text style={styles.subtitle}>Your Campaign, Simplified</Text> */}
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               placeholderTextColor="#6B7280"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#6B7280"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#6B7280"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <TextInput
//               style={styles.input}
//               placeholder="Confirm Password"
//               placeholderTextColor="#6B7280"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry
//             />
//           </View>
//         </View>

//         <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//           <Text style={styles.signUpButtonText}>Create Account</Text>
//         </TouchableOpacity>

//         <View style={styles.loginLink}>
//           <Text style={styles.loginText}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.loginLinkText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#090a0aff", // Dark background
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingTop: 24,
//     justifyContent: "flex-start",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   logo: {
//     // Added logo styling
//     width: 220,
//     height: 220,
//     marginBottom: 0,
//   },
//   welcomeText: {
//     // Added welcome text
//     color: "#FFFFFF",
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 32, // Larger title
//     fontWeight: "bold",
//     color: "#FFFFFF", // White text
//     marginBottom: 8,
//     letterSpacing: 1,
//   },
//   subtitle: {
//     color: "#9CA3AF", // Gray subtitle
//     textAlign: "center",
//     fontSize: 16,
//   },
//   formContainer: {
//     marginBottom: 32,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//      borderColor: "#374151",
//     backgroundColor: "#17181aff",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 16, // More padding
//     color: "#FFFFFF", // White text
//     fontSize: 16,
//   },
//   signUpButton: {
//     backgroundColor: "#931b1bff", // Red button
//     paddingVertical: 18, // More padding
//     borderRadius: 8,
//     marginBottom: 24,
//     shadowColor: "#c41919ff",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   signUpButtonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   loginLink: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   loginText: {
//     color: "#9CA3AF", // Gray text
//     fontSize: 16,
//   },
//   loginLinkText: {
//     color: "#9CA3AF", // Gray text
//     fontSize: 16,
//   },
// })












"use client";

import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Toast from "react-native-toast-message";
import BaseUrl from "../../BaseUrl.js"
export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordMismatch = confirmPassword && password !== confirmPassword;
  const incompleteFields = name==="" || email==="" || password==="" || confirmPassword==="";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSignUp = async () => {
    console.log("entering handle signup");
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "All fields are required",
      });
      return;
    }
     if (!emailRegex.test(email)) {
    Toast.show({
      type: "error",
      text1: "Invalid Email Format",
      text2: "Please enter a valid email address",
    });
    return;
  }

    if (passwordMismatch) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);

     const res = await axios.post(
      `${BaseUrl}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

      const data = res.data;

      if (data.success) {
        Toast.show({
          type: "success",
          text1: "Account Created!",
          text2: "Welcome to Campaign Helper 🎉",
        });
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Signup Failed",
          text2: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Network error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>CAMPAIGN HELPER</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#6B7280"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#6B7280"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#6B7280"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {passwordMismatch && (
            <Text style={styles.errorText}>⚠ Passwords do not match</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.signUpButton,
            (passwordMismatch || loading || incompleteFields) && { opacity: 0.6 },
          ]}
          onPress={handleSignUp}
          disabled={passwordMismatch || loading || incompleteFields}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signUpButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLinkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090a0aff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 0,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 1,
  },
  formContainer: {
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#17181aff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 5,
  },
  signUpButton: {
    backgroundColor: "#931b1bff",
    paddingVertical: 18,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: "#c41919ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  loginLinkText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
});
