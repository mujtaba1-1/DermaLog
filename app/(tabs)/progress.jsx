import { StyleSheet, Text, Dimensions, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useState, useEffect } from 'react'
import { subDays, format } from 'date-fns';
import { useLogs } from '../../context/LogContext'
import { Ionicons } from '@expo/vector-icons'

import Header from '../../components/Header'
import TitleText from '../../components/TitleText'
import ConnectionError from '../../components/ConnectionError'


const screenWidth = Dimensions.get('window').width;
const bodyParts = ['Hands', 'Face', 'Arms', 'Legs', 'Torso', 'Feet']

const formatDayMonth = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return null;
  
  const day = date.getDate();
  const month = date.getMonth() + 1;
  
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  
  return `${dayStr}/${monthStr}`;
};

const Progress = () => {

  const [selectedPart, setSelectedPart] = useState(bodyParts[0])
  const [itchinessData, setItchinessData] = useState([])
  const [rednessData, setRednessData] = useState([])
  const [drynessData, setDrynessData] = useState([])
  const [datesData, setDatesData] = useState([])
  const [streak, setStreak] = useState(1)
  const [bestDay, setBestDay] = useState({})


  const createData = () => {
    const logs = areaGroups?.[selectedPart] ?? [];

    const logsByDate = logs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toISOString().slice(0, 10);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    }, {})

    const averageByDate = Object.entries(logsByDate).map(([date, logs]) => {
      const totalItchiness = logs.reduce((sum, log) => sum + log.itchinessRating, 0);
      const totalRedness = logs.reduce((sum, log) => sum + log.rednessRating, 0);
      const totalDryness = logs.reduce((sum, log) => sum + log.drynessRating, 0);

      return {
        date,
        averageItchiness: totalItchiness / logs.length,
        averageRedness: totalRedness / logs.length,
        averageDryness: totalDryness / logs.length,
      };
    });

    const latest7Days = averageByDate
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7)
      .reverse();

    const jitter = 0.1;

    const itchiness = latest7Days.map(day => day.averageItchiness + 0 * jitter);
    const redness = latest7Days.map(day => day.averageRedness + 1 * jitter);
    const dryness = latest7Days.map(day => day.averageDryness + 2 * jitter);
    const dates = latest7Days.map(day => formatDayMonth(day.date));

    setItchinessData(itchiness)
    setRednessData(redness)
    setDrynessData(dryness)
    setDatesData(dates)

    let streak = 0;
    let currentDate = new Date().toISOString().slice(0, 10);

    do {
      streak++;
      currentDate = format(subDays(new Date(currentDate), 1), 'yyyy-MM-dd');
    } while (currentDate in logsByDate && logsByDate[currentDate].length > 0)

    let bestDay = null
    let bestScore = Infinity

    latest7Days.forEach(log => {
      const score = (log.averageItchiness + log.averageRedness + log.averageDryness) / 3
      if (score < bestScore) {
        bestScore = score;
        bestDay = log.date
      }
    })

    setStreak(streak)
    setBestDay({
      day: bestDay ? new Date(bestDay).toLocaleDateString('en-GB', { weekday: 'long' }) : 'N/A',
      score: bestScore.toFixed(1)
    })
    
  }

  const { areaGroups, loading, error } = useLogs();

  useEffect(() => {
    createData()
  }, [selectedPart])

  return (
    <>
      <Header screen={"Progress"} />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#397FF5" />
        ) : error ? (<ConnectionError />) : (
        <>
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
          <View>
            <LineChart
              data={{
                labels: datesData,
                datasets: [
                  {
                    data: itchinessData,
                    color: () => "#E74C3C", // Red for Itchiness
                    strokeWidth: 2.5,
                  },
                  {
                    data: rednessData,
                    color: () => "#2980B9", // Blue for Redness
                    strokeWidth: 2.5,
                  },
                  {
                    data: drynessData,
                    color: () => "#F1C40F", // Yellow for Dryness
                    strokeWidth: 2.5,
                  },
                ],
                legend: ["Itchiness", "Redness", "Dryness"],
              }}
              width={screenWidth - 32}
              height={screenWidth - 64}
              withShadow={false}
              withInnerLines={true}
              withOuterLines={false}
              withDots={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={true}
              segments={10}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#ffffff",
                },
                propsForBackgroundLines: {
                  stroke: "#e6e6e6",
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              yAxisInterval={1}
              min={0}
              max={10}
              bezier
              style={[styles.chart, {marginLeft: -10}]}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.infoContainer, {borderColor: '#BBF7D0', backgroundColor: '#F0FDF4'}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='trending-up-outline' size={20} color='#16A34A' />
                <Text style={[styles.infoContainerHead, {color: '#14532D'}]}>
                  Best Day
                </Text>
              </View>
              <TitleText style={{fontSize: 20, fontWeight: '700', color: '#14532D'}}>{bestDay?.day}</TitleText>
              <Text style={{color: '#16A34A'}}>Avg: {bestDay?.score === "Infinity" ? 0 : bestDay.score}/10</Text>
            </View>
            <View style={[styles.infoContainer, {borderColor: '#BFDBFE', backgroundColor: '#EFF6FF'}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='calendar-clear-outline' size={20} color='#2462EB' />
                <Text style={[styles.infoContainerHead, {color: '#1E3A8A'}]}>
                  Streak
                </Text>
              </View>
              <TitleText style={{fontSize: 20, fontWeight: '700', color: '#1E3A8A'}}>{streak} days</TitleText>
              <Text style={{color: '#2462EB'}}>Consistent Logging</Text>
            </View>
          </View>
        </>)}
      </ScrollView>
    </>
  )
}

export default Progress

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
    padding: 8,
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  bodyPartButtonPressed: {
    borderColor: '#3B82F6',
    backgroundColor: '#DBEAFE'
  },
  infoContainer: {
    borderWidth: 1,
    width: '48%',
    paddingVertical: 8,
    paddingLeft: 8,
    borderRadius: 12
  },
  infoContainerHead: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6 
  }
});