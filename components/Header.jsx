import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screens = {
  Dashboard: {
    heading: 'Hello, User',
    subHeading: 'How\'s your skin feeling today?'
  },
  Profile: {
    heading: 'Profile',
    subHeading: 'Manage your account'
  },
  Analysis: {
    heading: 'AI Skin Analysis',
    subHeading: 'Upload a photo for analysis'
  },
  Logs: {
    heading: 'Log Symptoms',
    subHeading: 'Track your daily condition'
  },
  Progress: {
    heading: 'Track Progress',
    subHeading: 'View your improvement trends'
  }
}

const Header = ({screen, showProfile = false}) => {
  const {heading, subHeading} = screens[screen] || {heading: '', subHeading: ''};

  if (!showProfile) {
    return (
      <View style={styles.header}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.subHeading}>{subHeading}</Text>
        </View>
        <Pressable
          accessibilityLabel='Profile Button'
          accessibilityHint='Navigate to your profile'
          style={({pressed}) => [styles.profileBtn, pressed && {backgroundColor: '#E5E7EB'}]}
        >
          <Ionicons name='person-outline' size={20} />
        </Pressable>
      </View>
    </>
  )
  
};

export default Header;

const styles = StyleSheet.create({
    header: {
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: '#111827'
    },
    subHeading: {
      fontSize: 14,
      color: '#4b5563'
    },
    profileBtn: {
      backgroundColor: '#F3F4F6',
      padding: 10,
      borderRadius: 50,
      marginRight: 10
    }
});
