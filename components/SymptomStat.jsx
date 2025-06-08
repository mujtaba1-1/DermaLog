import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SymptomStat = ({type, score}) => {
  const width = `${score / 10 * 100}%`;

  const barColor = score < 3 ? '#4ADE80' : score < 7 ? '#FACC15' : '#F87171';

  return (
    <View style={[styles.flex, {justifyContent: 'space-between'}]}>
      <Text style={{fontSize: 16, color: '#738E95'}}>{type}</Text>
      <View style={[styles.flex, {gap: 8, justifyContent: 'flex-end'}]}>
          <View style={styles.bar}>
            <View style={{ height: '100%', width, backgroundColor: barColor, borderRadius: 4 }} />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 0.5}}>{score}/10</Text>
      </View>
    </View>
  )
}

export default SymptomStat

const styles = StyleSheet.create({
    bar: {
        height: 10,
        width: '50%',
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})