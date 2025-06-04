import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import TitleText from '../components/TitleText';
import QuickActionCard from '../components/QuickActionCard';

const DashboardScreen = () => {
  return (
    <>
    <Header screen={"Dashboard"} showProfile={true}/>
    <ScrollView style={styles.container}>
      <TitleText>Quick Actions</TitleText>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8}}>
        <QuickActionCard actionKey={'analysis'}></QuickActionCard>
        <QuickActionCard actionKey={'logs'}></QuickActionCard>
        <QuickActionCard actionKey={'progress'}></QuickActionCard>
      </View>
    </ScrollView>
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
