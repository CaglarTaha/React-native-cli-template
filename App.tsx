import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { StorageService } from './utils/storage';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import TabNavigator from './navigation/TabNavigator';


const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLogin = await StorageService.getIsLoggedIn();
      setIsLoggedIn(isLogin || false);
    };

    checkLoginStatus();

    // Check login status periodically to handle logout
    const interval = setInterval(checkLoginStatus, 1000);
    
    return () => clearInterval(interval);
  }, [])

  const handleFinishSplash = () => {
    setShowSplash(false);
  };

  const handleFinishOnboarding = async () => {
    setShowOnboarding(false);
    await StorageService.setShowOnboarding(false);
  };

  return (
    <Provider store={store}>
      {showSplash ? (
        <SplashScreen onFinish={handleFinishSplash} />
      ) : showOnboarding ? (
        <OnboardingScreen onFinish={handleFinishOnboarding} />
      ) : isLoggedIn ? (
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </Provider>
  );
};

export default App;
