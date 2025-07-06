import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'isLoggedIn',
  SHOW_ONBOARDING: 'showOnboarding',
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  THEME_MODE: 'themeMode',
} as const;

export class StorageService {
  static async getIsLoggedIn(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error getting login status:', error);
      return false;
    }
  }

  static async setIsLoggedIn(isLoggedIn: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
    } catch (error) {
      console.error('Error setting login status:', error);
    }
  }

  static async getShowOnboarding(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.SHOW_ONBOARDING);
      return value ? JSON.parse(value) : true;
    } catch (error) {
      console.error('Error getting onboarding status:', error);
      return true;
    }
  }

  static async setShowOnboarding(showOnboarding: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SHOW_ONBOARDING, JSON.stringify(showOnboarding));
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  }

  static async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // JWT Token yönetimi
  static async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }

  static async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  static async setUserData(userData: any): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }

  static async getUserData(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  static async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  }

  // Theme Management
  static async setThemeMode(themeMode: 'light' | 'dark' | 'system'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode);
    } catch (error) {
      console.error('Error setting theme mode:', error);
    }
  }

  static async getThemeMode(): Promise<'light' | 'dark' | 'system'> {
    try {
      const themeMode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      return (themeMode as 'light' | 'dark' | 'system') || 'light';
    } catch (error) {
      console.error('Error getting theme mode:', error);
      return 'light';
    }
  }
}


