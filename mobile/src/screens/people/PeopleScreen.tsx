import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PeopleScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Hub</Text>
      <Text style={styles.description}>
        HR Cases, Onboarding, and Customer service will be displayed here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default PeopleScreen;