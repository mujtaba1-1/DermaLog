import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleText from './TitleText'
import { Ionicons } from '@expo/vector-icons';
import SymptomStat from './SymptomStat';

const condition = {
  "Improving": {
    color: "#16A34A",
    icon: "trending-up-outline",
    text: "Improving"
  },
  "Worsening": {
    color: "#EF4444",
    icon: "trending-down-outline",
    text: "Worsening"
  },
  "Stable": {
    color: "#2563EB",
    icon: "checkmark-circle-outline",
    text: "Stable"
  }
}

const calculateCondition = (log1, log2) => {
  if (!log1 || !log2) return condition["Stable"];

  const score1 = (log1.itchinessRating + log1.rednessRating + log1.drynessRating) / 3;
  const score2 = (log2.itchinessRating + log2.rednessRating + log2.drynessRating) / 3;

  const change = score2 - score1;

  if (change <= -1.0) {
      return condition["Improving"];
  } else if (change >= 1.0) {
      return condition["Worsening"];
  } else {
      return condition["Stable"];
  }
}

const SymptomOverviewCard = ({area, data}) => {

  const latestLog = data[0];
  const previousLog = data.length >= 2 ? data[1] : null;

  const currentCondition = calculateCondition(previousLog, latestLog);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          <TitleText style={{fontSize: 16}}>{area}</TitleText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={currentCondition.icon} size={20} color={currentCondition.color} />
            <Text style={{ fontSize: 16, color: currentCondition.color, marginLeft: 4, fontWeight: '500' }}>{currentCondition.text}</Text>
          </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10, marginBottom: 8}}>
        <SymptomStat type={"Itchiness"} score={latestLog.itchinessRating}></SymptomStat>
        <SymptomStat type={"Redness"} score={latestLog.rednessRating}></SymptomStat>
        <SymptomStat type={"Dryness"} score={latestLog.drynessRating}></SymptomStat>
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