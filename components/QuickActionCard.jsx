import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

const quickActions = {
  items: 3,
  analysis: {
    icon: 'camera-outline',
    title: 'Skin Analysis',
    colorOne: '#A652F6',
    colorTwo: '#9435EB'
  },
  logs: {
    icon: 'add-outline',
    title: 'Log Symptoms',
    colorOne: '#397FF5',
    colorTwo: '#2766EC'
  },
  progress: {
    icon: 'trending-up-outline',
    title: 'Track Progress',
    colorOne: '#21C25D',
    colorTwo: '#17A64C'
  }
};

const QuickActionCard = ({ actionKey, onPress }) => {
  const action = quickActions[actionKey];

  if (!action) return null;

  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - 32 - (quickActions.items - 1) * 8; // Subtracting padding and gap
  const cardWidth = availableWidth / quickActions.items;

  return (
    <Pressable
     onPress={onPress}
     style={({ pressed }) => [
       styles.card,
       { backgroundColor: action.color, width: cardWidth },
       pressed && styles.pressed
     ]}
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