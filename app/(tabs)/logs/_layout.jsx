import { Stack } from 'expo-router';

export default function LogsLayout() {
  return (
    <Stack>
        <Stack.Screen 
            name='logs'
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen 
            name='add-log'
            options={{
                title: 'Add Log',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTintColor: '#000',
                headerShadowVisible: false
            }}
        />
    </Stack>
);
}