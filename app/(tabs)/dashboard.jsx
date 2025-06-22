import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useLogs } from '../../context/LogContext';

import Header from '../../components/Header';
import TitleText from '../../components/TitleText';
import QuickActionCard from '../../components/QuickActionCard';
import SymptomOverviewCard from '../../components/SymptomOverviewCard';
import ConnectionError from '../../components/ConnectionError';

const DashboardScreen = () => {
  const { areaGroups, loading, error } = useLogs();

  return (
    <>
    <Header screen={"Dashboard"} showProfile={true}/>
    <ScrollView style={styles.container}>
      
      {/* Quick Action */}
      <TitleText style={styles.titleMargin}>Quick Actions</TitleText>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8}}>
        <QuickActionCard actionKey={'logs'}></QuickActionCard>
        <QuickActionCard actionKey={'progress'}></QuickActionCard>
      </View>

      {/* Symptom Overview */}
      <TitleText style={styles.titleMargin}>Symptom Overview</TitleText>
      <View style={loading || error ? { height: '70%', justifyContent: 'center'} : {}}>
        {loading ? (
            <ActivityIndicator size="large" color="#397FF5" />
          ) : error ? (<ConnectionError />) : (
            Object.keys(areaGroups).map((area) => {
              if (!areaGroups[area].length) {
                return null;
              }
              return <SymptomOverviewCard key={area} area={area} data={areaGroups[area]}/>;
            })
          )
        }
      </View>
    </ScrollView>
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  titleMargin: {
    marginBottom: 16
  }
});
