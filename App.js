import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './screens/DashboardScreen';
import SafeView from './components/SafeView';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeView safe={true}>
        <DashboardScreen/>
      </SafeView>
    </SafeAreaProvider>
  );
}
