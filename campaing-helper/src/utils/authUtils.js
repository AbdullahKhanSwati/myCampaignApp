import AsyncStorage from '@react-native-async-storage/async-storage';

// Store user data in AsyncStorage
export const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data stored successfully');
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

// Get user data from AsyncStorage
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Clear user data from AsyncStorage (logout)
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    console.log('User data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData !== null;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
