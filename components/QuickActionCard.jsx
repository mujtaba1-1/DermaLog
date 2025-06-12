import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogs } from '../context/LogContext';
import { useRouter } from 'expo-router';  

const quickActions = {
  items: 3,
  analysis: {
    icon: 'camera-outline',
    title: 'Skin Analysis',
    colorOne: '#A652F6',
    colorTwo: '#9435EB',
    route: '/analysis'  
  },
  logs: {
    icon: 'add-outline',
    title: 'Log Symptoms',
    colorOne: '#397FF5',
    colorTwo: '#2766EC',
    route: '/logs/add-log'  
  },
  progress: {
    icon: 'trending-up-outline',
    title: 'Track Progress',
    colorOne: '#21C25D',
    colorTwo: '#17A64C',
    route: '/progress'  
  }
};

const QuickActionCard = ({ actionKey }) => {
  const action = quickActions[actionKey];
  const router = useRouter();  
  const { loading } = useLogs();

  if (!action) return null;

  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - 32 - (quickActions.items - 1) * 8;
  const cardWidth = availableWidth / quickActions.items;

  return (
    <Pressable
      onPress={() => {
        if (action.route) {
          router.push(action.route);  
        }
      }}
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.pressed
      ]}
      disabled={loading}
    >
      <LinearGradient
        colors={[action.colorOne, action.colorTwo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Ionicons name={action.icon} size={24} color="#fff" />
        <View>
          <Text style={styles.title}>{action.title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default QuickActionCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  pressed: {
    opacity: 0.8
  },
  gradient: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center'
  }
});
