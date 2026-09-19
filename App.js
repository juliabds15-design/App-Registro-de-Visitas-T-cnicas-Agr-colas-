import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RegistroVisitaScreen from './src/screens/RegistroVisitaScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F9" />
      <RegistroVisitaScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F9' }
});