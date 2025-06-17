import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLogs } from "../context/LogContext";

import TitleText from "./TitleText";

const ConnectionError = () => {

  const { refreshLogs } = useLogs();

  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" style={{ marginBottom: 12 }} />
      <TitleText style={styles.title}>Connection Error</TitleText>
      <Text style={styles.message}>Oops! We&apos;re having trouble reaching the server.</Text>
      <Text style={styles.message}>Please try again later!</Text>
      <Pressable 
        style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}
        onPress={refreshLogs}
      >
        <Ionicons name="refresh-outline" size={20} color="#fff" />
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  );
};

export default ConnectionError

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24
  },
  title: {
    color: '#EF4444',
  },
  message: {
    color: '#738E95',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 2,
  },
  retryButton: {
    marginTop: 18,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.8,
  },
});