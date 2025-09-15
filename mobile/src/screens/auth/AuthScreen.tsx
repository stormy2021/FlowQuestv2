import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlowQuest</Text>
      <Text style={styles.subtitle}>ServiceNow Mobile Experience</Text>
      <Text style={styles.description}>
        Authentication flow will be implemented here
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default AuthScreen;