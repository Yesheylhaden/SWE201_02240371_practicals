import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskBoardScreen from '../screens/TaskBoardScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskBoard" component={TaskBoardScreen} />
    </Stack.Navigator>
  );
}
