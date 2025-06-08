import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleText from './TitleText'
import { Ionicons } from '@expo/vector-icons';
import SymptomStat from './SymptomStat';

const SymptomOverviewCard = ({area}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          <TitleText style={{fontSize: 16}}>{area}</TitleText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="trending-up-outline" size={20} color="#16A34A" />
            <Text style={{ fontSize: 16, color: '#16A34A', marginLeft: 4, fontWeight: '500' }}>Improving</Text>
          </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10, marginBottom: 8}}>
        <SymptomStat type={"Itchiness"} score={2}></SymptomStat>
        <SymptomStat type={"Redness"} score={4}></SymptomStat>
        <SymptomStat type={"Itchiness"} score={9}></SymptomStat>
      </View>
    </View>
  )
}

export default SymptomOverviewCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderColor: '#F3F4F6',
        borderWidth: 1,
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: 16
    }
})