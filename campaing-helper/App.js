import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// Import screens
import CanvassingScreen from "./src/screens/CanvassingScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OtpVerificationScreen from "./src/screens/OtpVerificationScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import NotesScreen from "./src/screens/NotesScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import RouteMapScreen from "./src/screens/RouteMapScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SubscriptionScreen from "./src/screens/SubscriptionScreen";
import VolunteerScreen from "./src/screens/VolunteerScreen";
import VoterListScreen from "./src/screens/VoterListScreen";
import EditVoterScreen from "./src/screens/EditVoterScreen";
import AccountSharingScreen from "./src/screens/AccountSharingScreen";
import Toast from "react-native-toast-message";
registerRootComponent(App);
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: "#F9FAFB",
//           width: 280,
//         },
//         drawerActiveTintColor: "#3B82F6",
//         drawerInactiveTintColor: "#6B7280",
//         drawerLabelStyle: {
//           fontSize: 16,
//           fontWeight: "600",
//         },
//       }}
//     >
//       <Drawer.Screen
//         name="Dashboard"
//         component={DashboardScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Dashboard</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>📊</Text>,
//         }}
//       />
//       <Drawer.Screen
//         name="VoterList"
//         component={VoterListScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Voter List</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>👥</Text>,
//         }}
//       />
//       <Drawer.Screen
//         name="Canvassing"
//         component={CanvassingScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Canvassing</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>🗺️</Text>,
//         }}
//       />
//       <Drawer.Screen
//         name="Notes"
//         component={NotesScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Notes & Details</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>📊</Text>,
//         }}
//       />
//       <Drawer.Screen
//         name="Volunteer"
//         component={VolunteerScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Volunteers</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>🤝</Text>,
//         }}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           drawerLabel: <Text style={{ fontSize: 16 }}>Settings</Text>,
//           drawerIcon: () => <Text style={{ fontSize: 16 }}>⚙️</Text>,
//         }}
//       />
//     </Drawer.Navigator>
//   )
// }

// Custom Drawer Content to handle volunteer status
function CustomDrawerContent(props) {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [hasSelectedRoute, setHasSelectedRoute] = useState(false);

  const loadVolunteerStatus = async () => {
    try {
      const volunteerStatus = await AsyncStorage.getItem("isVolunteer");
      const hasRoute = await AsyncStorage.getItem("hasSelectedRoute");
      
      const userIsVolunteer = volunteerStatus === "true";
      setIsVolunteer(userIsVolunteer);
      
      // Set route selection status
      if (userIsVolunteer) {
        setHasSelectedRoute(hasRoute === "true");
      } else {
        setHasSelectedRoute(true); // Non-volunteers always have access
      }
    } catch (error) {
      console.error("Error loading volunteer status:", error);
    }
  };

  useEffect(() => {
    loadVolunteerStatus();
  }, []);

  // Reload when drawer opens (using navigation state)
  useEffect(() => {
    loadVolunteerStatus();
  }, [props.state]);

  // Refresh when drawer opens (using useFocusEffect from navigation)
  // Note: useFocusEffect might not work in drawer content, so we rely on interval

  const { state, navigation } = props;

  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#F9FAFB" }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeName = route.name;
        
        // Determine if route should be disabled for volunteers
        let isDisabled = false;
        if (isVolunteer) {
          // Volunteers button is always disabled for volunteers
          if (routeName === "Volunteer") {
            isDisabled = true;
          }
          // VoterList and Canvassing are disabled until route is selected
          else if (routeName === "VoterList" || routeName === "Canvassing") {
            isDisabled = !hasSelectedRoute;
          }
          // AccountSharing and Settings are always enabled
          // Dashboard is always enabled
        }

        const onPress = () => {
          if (!isDisabled) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? "#3B82F6" : isDisabled ? "#9CA3AF" : "#6B7280";
        const opacity = isDisabled ? 0.4 : 1; // More visible disabled state

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            disabled={isDisabled}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              opacity,
            }}
          >
            <Text style={{ fontSize: 16, marginRight: 12 }}>
              {routeName === "Dashboard" && "📊"}
              {routeName === "VoterList" && "👥"}
              {routeName === "Canvassing" && "🗺️"}
              {routeName === "Volunteer" && "🤝"}
              {routeName === "AccountSharing" && "🔗"}
              {routeName === "Settings" && "⚙️"}
            </Text>
            <Text style={{ fontSize: 16, color, fontWeight: "600" }}>
              {routeName === "Dashboard" && "Dashboard"}
              {routeName === "VoterList" && "Voter List"}
              {routeName === "Canvassing" && "Canvassing"}
              {routeName === "Volunteer" && "Volunteers"}
              {routeName === "AccountSharing" && "Account Sharing"}
              {routeName === "Settings" && "Settings"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#F9FAFB",
          width: 280,
        },
        drawerActiveTintColor: "#3B82F6",
        drawerInactiveTintColor: "#6B7280",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Dashboard</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>📊</Text>,
        }}
      />
      <Drawer.Screen
        name="VoterList"
        component={VoterListScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Voter List</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>👥</Text>,
        }}
      />
      <Drawer.Screen
        name="Canvassing"
        component={CanvassingScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Canvassing</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>🗺️</Text>,
        }}
      />
      <Drawer.Screen
        name="Volunteer"
        component={VolunteerScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Volunteers</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>🤝</Text>,
        }}
      />
      <Drawer.Screen
        name="AccountSharing"
        component={AccountSharingScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Account Sharing</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>🔗</Text>,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: ({ color }) => (
            <Text style={{ fontSize: 16, color }}>Settings</Text>
          ),
          drawerIcon: () => <Text style={{ fontSize: 16 }}>⚙️</Text>,
        }}
      />
    </Drawer.Navigator>
  )
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            {/* Replaced individual main screens with DrawerNavigator */}
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen name="RouteMap" component={RouteMapScreen} />
            <Stack.Screen name="EditVoter" component={EditVoterScreen} />
            <Stack.Screen name="Notes" component={NotesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
         <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
