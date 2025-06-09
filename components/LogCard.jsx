import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleText from './TitleText'
import { Ionicons } from '@expo/vector-icons';
import SymptomStat from './SymptomStat';
import Trigger from './Trigger';

const LogCard = ({area}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          <TitleText style={{fontSize: 16}}>Date</TitleText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable style={({pressed}) => pressed && styles.pressed}>
                <Ionicons name='create-outline' size={20} color='#007AFF' />
            </Pressable>
            <Pressable style={({pressed}) => pressed && styles.pressed}>
                <Ionicons name='trash-outline' size={20} color='#EF4444' />
            </Pressable>
          </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10, marginBottom: 8}}>
        <SymptomStat type={"Itchiness"} score={2}></SymptomStat>
        <SymptomStat type={"Redness"} score={4}></SymptomStat>
        <SymptomStat type={"Itchiness"} score={9}></SymptomStat>
      </View>
      <View>
        <TitleText style={{fontSize: 16}}>Potential Triggers</TitleText>
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 8, flexWrap: 'wrap'}}>
            <Trigger trigger={"Stress"} />
            <Trigger trigger={"Weather"} />
        </View>
      </View>
      <View>
        <TitleText style={{fontSize: 16}}>Notes</TitleText>
        <Text style={{color: '#738E95', fontSize: 14, marginTop: 4}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </View>
  )
}

export default LogCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderColor: '#F3F4F6',
        borderWidth: 1,
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: 16
    },
    pressed: {
        opacity: 0.5
    }
})