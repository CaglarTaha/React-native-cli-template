import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { StorageService } from '../../utils/storage';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Color schemes
interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  notification: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  shadowColor: string;
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
}

// Theme interface
interface Theme {
  mode: ThemeMode;
  colors: ColorScheme;
}

// Light theme colors
const lightColors: ColorScheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#f5f5f5',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  notification: '#ff3b30',
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
  info: '#3498db',
  shadowColor: '#000000',
  tabBarBackground: '#ffffff',
  tabBarActive: '#3498db',
  tabBarInactive: '#8e8e93',
};

// Dark theme colors
const darkColors: ColorScheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#121212',
  surface: '#1e1e1e',
  card: '#2d2d2d',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  border: '#404040',
  notification: '#ff453a',
  error: '#ff453a',
  success: '#30d158',
  warning: '#ff9f0a',
  info: '#64d2ff',
  shadowColor: '#ffffff',
  tabBarBackground: '#1e1e1e',
  tabBarActive: '#64d2ff',
  tabBarInactive: '#8e8e93',
};

// Theme state
interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: ColorScheme;
}

// Get initial theme based on system preference
const getInitialTheme = (): ThemeState => {
  const systemColorScheme = Appearance.getColorScheme();
  const isDark = systemColorScheme === 'dark';
  
  return {
    mode: isDark ? 'dark' : 'light',
    isDark,
    colors: isDark ? darkColors : lightColors,
  };
};

const initialState: ThemeState = getInitialTheme();

// Theme slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      
      // Update colors based on mode
      if (action.payload === 'dark') {
        state.isDark = true;
        state.colors = darkColors;
      } else if (action.payload === 'light') {
        state.isDark = false;
        state.colors = lightColors;
      } else {
        // System mode - follow system preference
        const systemColorScheme = Appearance.getColorScheme();
        state.isDark = systemColorScheme === 'dark';
        state.colors = state.isDark ? darkColors : lightColors;
      }
      
      // Save to storage
      StorageService.setThemeMode(action.payload);
    },
    loadStoredTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      
      // Always follow system preference
      const systemColorScheme = Appearance.getColorScheme();
      state.isDark = systemColorScheme === 'dark';
      state.colors = state.isDark ? darkColors : lightColors;
    },
    updateSystemTheme: (state) => {
      // Update theme based on current system preference
      const systemColorScheme = Appearance.getColorScheme();
      state.isDark = systemColorScheme === 'dark';
      state.mode = state.isDark ? 'dark' : 'light';
      state.colors = state.isDark ? darkColors : lightColors;
    },
    updateCustomColors: (state, action: PayloadAction<Partial<ColorScheme>>) => {
      state.colors = { ...state.colors, ...action.payload };
    },
  },
});

export const { setThemeMode, loadStoredTheme, updateSystemTheme, updateCustomColors } = themeSlice.actions;
export default themeSlice.reducer;

// Selectors
export const selectTheme = (state: { theme: ThemeState }) => state.theme;
export const selectThemeColors = (state: { theme: ThemeState }) => state.theme.colors;
export const selectIsDarkTheme = (state: { theme: ThemeState }) => state.theme.isDark;