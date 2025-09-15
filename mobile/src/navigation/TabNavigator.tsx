import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import WorkScreen from '../screens/work/WorkScreen';
import AssetsScreen from '../screens/assets/AssetsScreen';
import PeopleScreen from '../screens/people/PeopleScreen';
import MeScreen from '../screens/me/MeScreen';

export type TabParamList = {
  Work: undefined;
  Assets: undefined;
  People: undefined;
  Me: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
        },
      }}>
      <Tab.Screen
        name="Work"
        component={WorkScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>🔧</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Assets"
        component={AssetsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>💻</Text>
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={PeopleScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;