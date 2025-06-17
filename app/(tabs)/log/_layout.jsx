import { Stack } from 'expo-router';

export default function LogsLayout() {
  return (
    <Stack initialRouteName='logs'>
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
            }}
        />
        <Stack.Screen 
            name='update-log'
            options={{
                title: 'Update Log',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    
                },
                headerTintColor: '#000',
            }}
        />
    </Stack>
);
}