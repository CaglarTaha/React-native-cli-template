import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'isLoggedIn',
  SHOW_ONBOARDING: 'showOnboarding',
};

export const StorageService = {
  async getIsLoggedIn(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return value === 'true';
    } catch (error) {
      console.error('Error getting login status:', error);
      return false;
    }
  },

  async setIsLoggedIn(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, value.toString());
    } catch (error) {
      console.error('Error setting login status:', error);
    }
  },

  async getShowOnboarding(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.SHOW_ONBOARDING);
      return value !== 'false';
    } catch (error) {
      console.error('Error getting onboarding status:', error);
      return true;
    }
  },

  async setShowOnboarding(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SHOW_ONBOARDING, value.toString());
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
};


