import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  setThemeMode, 
  loadStoredTheme, 
  selectTheme, 
  selectThemeColors,
  selectIsDarkTheme,
  ThemeMode 
} from '../store/slices/themeSlice';
import { StorageService } from './storage';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const colors = useAppSelector(selectThemeColors);
  const isDark = useAppSelector(selectIsDarkTheme);

  // Load stored theme and listen to system changes
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await StorageService.getThemeMode();
        dispatch(loadStoredTheme(storedTheme));
        
        // If system mode, set according to system preference
        if (storedTheme === 'system') {
          const systemColorScheme = Appearance.getColorScheme();
          dispatch(setThemeMode(systemColorScheme === 'dark' ? 'dark' : 'light'));
        }
      } catch (error) {
        console.error('Error loading stored theme:', error);
      }
    };

    loadTheme();

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Always follow system preference
      dispatch(setThemeMode(colorScheme === 'dark' ? 'dark' : 'light'));
    });

    return () => subscription?.remove();
  }, [dispatch]);

  // Set theme to follow system automatically
  const setSystemTheme = () => {
    const systemColorScheme = Appearance.getColorScheme();
    dispatch(setThemeMode(systemColorScheme === 'dark' ? 'dark' : 'light'));
  };

  return {
    // Theme state
    theme: theme.mode,
    colors,
    isDark,
    
    // Only system theme method
    setSystemTheme,
  };
};