import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, StackActions } from '@react-navigation/native';

import TitleText from '../../../components/TitleText'

const bodyParts = ['Hands', 'Face', 'Arms', 'Legs', 'Torso', 'Feet']

const AddLog = () => {
  const [selectedPart, setSelectedPart] = useState(null)
  const [itchinessRating, setItchinessRating] = useState(null)
  const [rednessRating, setRednessRating] = useState(null)
  const [drynessRating, setDrynessRating] = useState(null)
  const [additionalInformation, setAdditionalInformation] = useState()

  const router = useRouter()
  const navigation = useNavigation()

  const handleAddLog = () => {
    navigation.dispatch(StackActions.popToTop())
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container}>
        <TitleText>Select Body Part</TitleText>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
          {bodyParts.map((part) => (
            <Pressable
              key={part}
              onPress={() => setSelectedPart(part)}
              style={({ pressed }) => [
                styles.bodyPartButton,
                (pressed || selectedPart === part) && styles.bodyPartButtonPressed,
              ]}
            >
              <Text style={{fontSize: 16}}>{part}</Text>
            </Pressable>
          ))}
        </View>
        {selectedPart && (
          <>
            <View style={[styles.container, {borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 12, marginTop: 8}]}>
              <TitleText>Rate Symptoms for {selectedPart}</TitleText>
              <Text style={{fontSize: 16, marginTop: 8}}>Itchiness</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 11 }, (_, i) => (
                  <Pressable
                    key={'Itchiness-' + i}
                    onPress={() => setItchinessRating(i)}
                    style={({pressed}) => [
                      styles.ratingButton,
                      (pressed || itchinessRating === i) && { backgroundColor: '#DBEAFE', borderColor: '#3B82F6' }
                    ]}
                  >
                    <Text>{i}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={{fontSize: 16, marginTop: 8}}>Redness</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 11 }, (_, i) => (
                  <Pressable
                    key={'Redness-' + i}
                    onPress={() => setRednessRating(i)}
                    style={({pressed}) => [
                      styles.ratingButton,
                      (pressed || rednessRating === i) && { backgroundColor: '#DBEAFE', borderColor: '#3B82F6' }
                    ]}
                  >
                    <Text>{i}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={{fontSize: 16, marginTop: 8}}>Dryness</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 11 }, (_, i) => (
                  <Pressable
                    key={'Dryness-' + i}
                    onPress={() => setDrynessRating(i)}
                    style={({pressed}) => [
                      styles.ratingButton,
                      (pressed || drynessRating === i) && { backgroundColor: '#DBEAFE', borderColor: '#3B82F6' }
                    ]}
                  >
                    <Text>{i}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <TitleText style={{marginVertical: 24}}>Additional Notes</TitleText>
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={4}
              placeholder='Any triggers, treaments, or observations...'
              value={additionalInformation}
              onChangeText={setAdditionalInformation}
              textAlignVertical="top"
            />

            <Pressable 
              style={({pressed}) => [styles.addLogButton, pressed && styles.pressed]}
              onPress={handleAddLog}
            >
              <Ionicons name='add-outline' color='#fff' size={24}/>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>Add New Log</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddLog

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  bodyPartButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  bodyPartButtonPressed: {
    borderColor: '#3B82F6',
    backgroundColor: '#DBEAFE'
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8
  },
  ratingButton: {
    borderRadius: 12,
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textArea: {
    height: 100,            // You can adjust height to your liking
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16
  },
  addLogButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  pressed: {
    opacity: 0.8
  },
})
