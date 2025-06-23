import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable, Alert, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { logout } from '../../api/authService'
import { useLogs } from '../../context/LogContext'

import Header from '../../components/Header'
import TitleText from '../../components/TitleText'
import AsyncStorage from '@react-native-async-storage/async-storage'

const handleLogout = async () => {
  try {
    await logout()
    router.replace('(auth)')
  } catch (error) {
    Alert.alert('Error', 'Error logging out.')
  }
}

const Profile = () => {
  const [user, setUser] = useState(null)
  const { logs } = useLogs()

  useEffect(() => {
    const getUser = async () => {
      const userString = await AsyncStorage.getItem('user')
      const parsedUser = JSON.parse(userString)
      setUser(parsedUser)
    }

    getUser()
  }, [])


  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F87117" />
      </View>
    )
  }

  const date = new Date(user.createdAt)

  const monthYear = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);

  const year = date.getFullYear();

  return (
    <>
      <Header screen={"Profile"} />
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#F87117', '#EF4543']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Pressable
            accessibilityLabel='Profile Button'
            accessibilityHint='Navigate to your profile'
            style={({ pressed }) => [styles.profileBtn, pressed && { backgroundColor: 'rgba(255, 255, 255, 0.4)' }]}
          >
            <Ionicons name='person-outline' size={30} color={'#fff'} />
          </Pressable>
          <Text style={{ color: '#fff', fontSize: 20, marginVertical: 8, fontWeight: '600' }}>{user.username}</Text>
          <Text style={{ color: '#fff', fontSize: 15 }}>Member since {monthYear}</Text>
        </LinearGradient>

        <View style={[styles.infoContainer, { flexDirection: 'column', gap: 8 }]}>
          <TitleText>Account Information</TitleText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.infoMainText}>Email</Text>
            <Text style={styles.infoSubText}>{user.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.infoMainText}>Account Created</Text>
            <Text style={styles.infoSubText}>{year}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <TitleText>Health Stats</TitleText>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#2563EB', fontSize: 25, fontWeight: '700' }}>{logs.length}</Text>
            <Text style={{ color: '#4B5563' }}>Total Logs</Text>
          </View>
        </View>

        <Pressable style={({ pressed }) => [styles.button, pressed && { backgroundColor: '#FECACA' }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  profileBtn: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 20,
      borderRadius: 50,
  },
  gradient: {
    padding: 32,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16, 
    paddingBottom: 16,
    paddingTop: 8,
    marginTop: 16,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  infoMainText: {
    fontSize: 15,
    color: '#4B5563'
  },
  infoSubText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  buttonText: {
    color: '#E24949',
    fontWeight: '600',
    fontSize: 16,
  },
})