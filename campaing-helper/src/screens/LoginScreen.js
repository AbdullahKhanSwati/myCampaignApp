"use client";

import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from "../../BaseUrl.js";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const incompleteFields = email === "" || password === "";

  const handleLogin = async () => {
    if (!email || !password) {
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

    try {
      setLoading(true);

      const res = await axios.post(
        `${BaseUrl}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      if (data.success) {
        // Store user data in AsyncStorage
        try {
          await AsyncStorage.setItem('userData', JSON.stringify({
            userId: data.user.userId,
            email: data.user.email,
            name: data.user.name || data.user.firstName + ' ' + data.user.lastName,
            token: data.token || data.accessToken,
            ...data.user // Store all user data
          }));
          
          console.log('User data stored successfully:', data.user);
        } catch (storageError) {
          console.error('Error storing user data:', storageError);
          Toast.show({
            type: "error",
            text1: "Storage Error",
            text2: "Failed to save user data",
          });
        }

        Toast.show({
          type: "success",
          text1: "Login Successful!",
          text2: "Welcome back 👋",
        });
        
        // Check if user is a volunteer (has assignments but no campaign)
        let isVolunteer = false;
        let hasSelectedRoute = false;
        try {
          const volunteerCheck = await axios.get(`${BaseUrl}/volunteer/check`, {
            params: { 
              email: data.user.email,
              userId: data.user.userId 
            },
          });
          
          if (volunteerCheck.data?.success && volunteerCheck.data.isVolunteer) {
            isVolunteer = true;
            await AsyncStorage.setItem("isVolunteer", "true");
            // IMPORTANT: Remove any existing campaign data for volunteers
            await AsyncStorage.removeItem("currentCampaign");
            await AsyncStorage.removeItem("userCampaigns");
            
            // Check if volunteer has a selected route
            const selectedRoute = await AsyncStorage.getItem("selectedVolunteerRoute");
            hasSelectedRoute = !!selectedRoute;
            await AsyncStorage.setItem("hasSelectedRoute", hasSelectedRoute ? "true" : "false");
          } else {
            await AsyncStorage.setItem("isVolunteer", "false");
            await AsyncStorage.setItem("hasSelectedRoute", "true"); // Non-volunteers always have access
          }
        } catch (volunteerError) {
          console.error("Error checking volunteer status:", volunteerError);
          await AsyncStorage.setItem("isVolunteer", "false");
          await AsyncStorage.setItem("hasSelectedRoute", "true");
        }
        
        let shouldNavigateToMain = false;
        
        // If volunteer, skip campaign check and go directly to Main
        if (isVolunteer) {
          shouldNavigateToMain = true;
          console.log("Navigating volunteer to Main screen");
        } else {
          // Check for campaigns only if not a volunteer
          try {
            const campaignResponse = await axios.get(
              `${BaseUrl}/campaign/get-user-campaigns`,
              {
                params: { userId: data.user.userId },
                headers: {
                  Authorization: `Bearer ${data.token || data.accessToken || ""}`,
                },
              }
            );

            if (campaignResponse.data?.success && Array.isArray(campaignResponse.data.data)) {
              const campaigns = campaignResponse.data.data;
              if (campaigns.length > 0) {
                shouldNavigateToMain = true;
                await AsyncStorage.setItem("userCampaigns", JSON.stringify(campaigns));
                await AsyncStorage.setItem("currentCampaign", JSON.stringify(campaigns[0]));
              } else {
                await AsyncStorage.removeItem("currentCampaign");
                await AsyncStorage.removeItem("userCampaigns");
              }
            } else {
              await AsyncStorage.removeItem("currentCampaign");
              await AsyncStorage.removeItem("userCampaigns");
            }
          } catch (campaignError) {
            console.error("Error fetching user campaigns:", campaignError);
            Toast.show({
              type: "error",
              text1: "Campaign Fetch Failed",
              text2: "Unable to verify campaigns. Please try again.",
            });
            await AsyncStorage.removeItem("currentCampaign");
            await AsyncStorage.removeItem("userCampaigns");
          }
        }

        // Reset form
        setEmail("");
        setPassword("");

        if (shouldNavigateToMain) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          });
        } else {
          navigation.replace("Onboarding");
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message || "Invalid credentials",
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
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.title}>CAMPAIGN HELPER</Text>
            <Text style={styles.subtitle}>Your Campaign, Simplified</Text>
          </View>

          <View style={styles.form}>
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

            <View style={styles.inputGroup}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? "Hide" : "Show"} password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, (loading || incompleteFields) && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading || incompleteFields}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomLinks}>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 36,
  },
  logo: {
    width: 220,
    height: 220,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#d2d4d7ff",
    textAlign: "center",
    fontSize: 16,
  },
  form: {
    marginBottom: 24,
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
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#17181aff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 120,
    color: "#FFFFFF",
    fontSize: 16,
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  showPasswordText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#931b1bff",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#c41919ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  forgotPassword: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  signUpLink: {
    color: "#9CA3AF",
    fontSize: 16,
  },
});
