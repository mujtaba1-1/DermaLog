import { Stack } from 'expo-router';
import { LogProvider } from '../context/LogContext';

export default function Layout() {
  return (
    <LogProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LogProvider>
  );
}