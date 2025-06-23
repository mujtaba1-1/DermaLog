import { Stack } from "expo-router";
import { LogProvider } from "../context/LogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        setToken(savedToken);
      } catch (err) {
        console.error("Failed to load token", err);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LogProvider>
      {/* Status bar: black background, light icons */}
      <StatusBar style="dark" backgroundColor="#ffffff" />
      
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)/index" />
        )}
      </Stack>
    </LogProvider>
  );
}
