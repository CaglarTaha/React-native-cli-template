import React from 'react';
import { Text, Platform, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from '@react-native-vector-icons/fontawesome6';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: '#8e8e93',
          tabBarStyle: {
            backgroundColor: '#fff',
            paddingTop: 5,
            height: Platform.OS === 'ios' ? 85 : 60,
            paddingBottom: Platform.OS === 'ios' ? 30 : 5,
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            position: 'absolute',
            elevation: 5,
            zIndex: 1000,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Ana Sayfa" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="house" size={18} color={color} iconStyle="solid" />
            ),
          }}
        />
                <Tab.Screen 
          name="Profil" 
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="user" size={18} color={color} iconStyle="solid" />
            ),
          }}
        />
        <Tab.Screen 
          name="Ayarlar" 
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="gear" size={18} color={color} iconStyle="solid" />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;