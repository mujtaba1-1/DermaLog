import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import TitleText from '../../components/TitleText';
import QuickActionCard from '../../components/QuickActionCard';
import SymptomOverviewCard from '../../components/SymptomOverviewCard';

const DashboardScreen = () => {
  return (
    <>
    <Header screen={"Dashboard"} showProfile={true}/>
    <ScrollView style={styles.container}>
      
      {/* Quick Action */}
      <TitleText style={styles.titleMargin}>Quick Actions</TitleText>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8}}>
        <QuickActionCard actionKey={'analysis'}></QuickActionCard>
        <QuickActionCard actionKey={'logs'}></QuickActionCard>
        <QuickActionCard actionKey={'progress'}></QuickActionCard>
      </View>

      {/* Symptom Overview */}
      <TitleText style={styles.titleMargin}>Symptom Overview</TitleText>
      <View>
        <SymptomOverviewCard area={"Hands"} />
        <SymptomOverviewCard area={"Face"} />
        <SymptomOverviewCard area={"Arms"} />
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
