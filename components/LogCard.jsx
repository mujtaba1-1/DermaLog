import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { deleteLog } from '../api/logService';
import { useLogs } from '../context/LogContext';

import TitleText from './TitleText'
import SymptomStat from './SymptomStat';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const LogCard = ({data}) => {
  const router = useRouter();
  const { refreshLogs } = useLogs();

  const handleEditLog = () => {
    router.push({
      pathname: '/logs/update-log',
      params: {
        logId: data.id,
        area: data.area,
        itchiness: data.itchinessRating,
        redness: data.rednessRating,
        dryness: data.drynessRating,
        notes: data.notes
      }
    })
  }

  const handleDeleteLog = async () => {
    await deleteLog(data.id);
    refreshLogs();
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          <TitleText style={{fontSize: 16}}>{formatDate(data.date)}</TitleText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable 
              style={({pressed}) => pressed && styles.pressed}
              onPress={() => handleEditLog()}
            >
                <Ionicons name='create-outline' size={20} color='#007AFF' />
            </Pressable>
            <Pressable 
              style={({pressed}) => pressed && styles.pressed}
              onPress={() => handleDeleteLog()}
            >
                <Ionicons name='trash-outline' size={20} color='#EF4444' />
            </Pressable>
          </View>
      </View>
      <View style={{flexDirection: 'column', gap: 10, marginBottom: 8}}>
        <SymptomStat type={"Itchiness"} score={data.itchinessRating}></SymptomStat>
        <SymptomStat type={"Redness"} score={data.rednessRating}></SymptomStat>
        <SymptomStat type={"Dryness"} score={data.drynessRating}></SymptomStat>
      </View>
      <View>
        <TitleText style={{fontSize: 16}}>Notes</TitleText>
        <Text style={{color: '#738E95', fontSize: 14, marginTop: 4}}>
          {data.notes || "No notes proivded."}
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