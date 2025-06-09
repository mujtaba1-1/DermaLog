import { StyleSheet, ScrollView, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../../components/Header'
import { Ionicons } from '@expo/vector-icons';
import LogCard from '../../../components/LogCard';
import { useState } from 'react';

const areaGroups = {
  "Hands": [
    { id: 1, date: "2024-06-09" },
    { id: 2, date: "2024-06-08" }
  ],
  "Face": [
    { id: 3, date: "2024-06-09" },
    { id: 4, date: "2024-06-07" }
  ],
  "Arms": [],
  "Legs": [],
  "Torso": [],
  "Feet": []
  // Add more areas as needed
};

const Logs = () => {
  const router = useRouter();
  const [expandedArea, setExpandedArea] = useState(null);

  const toggleArea = (area) => {
    setExpandedArea(prev => prev === area ? null : area);
  };

  return (
    <>
      <Header screen={"Logs"} />
      <ScrollView style={styles.container}>
        <Pressable 
          style={({pressed}) => [styles.addLogButton, pressed && styles.pressed]}
          onPress={() => router.push('/logs/add-log')}
        >
          <Ionicons name='add-outline' color='#fff' size={24}/>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>Add New Log</Text>
        </Pressable>

        {/* Grouped Log Cards */}
        {Object.entries(areaGroups).map(([area, logs]) => (
          <View key={area} style={styles.areaGroup}>
            <Pressable 
              onPress={() => toggleArea(area)}
              style={styles.areaHeader}
            >
              <Text style={styles.areaTitle}>{area}</Text>
              <Ionicons 
                name={expandedArea === area ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#666"
              />
            </Pressable>
            {expandedArea === area && (
              <View style={styles.logsContainer}>
                {logs.map(log => (
                  <LogCard key={log.id} area={area} />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Logs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  addLogButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  },
  pressed: {
    opacity: 0.8
  },
  areaGroup: {
    marginBottom: 16,
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  areaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827'
  },
  logsContainer: {
    marginTop: 12,
    gap: 8
  }
});