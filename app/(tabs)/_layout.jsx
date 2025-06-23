import { Tabs, router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('jwt')
      if (!token) {
        router.replace('/index')
      } else {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, [])

  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: '#000', 
        tabBarInactiveTintColor: '#888', 
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 12 }
     }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home', 
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),       
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: 'Logs',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-outline" size={24} color={color} />
          ), 
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics-outline" size={24} color={color} />
          ), 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
