import React from 'react';

// Import function to create a stack navigator (for screen navigation)
import { createStackNavigator } from '@react-navigation/stack';

// Imported different screens (pages of the app)
import DashboardScreen    from '../Screens/DashboardScreen';
import ProfileScreen      from '../Screens/ProfileScreen';
import CourseDetailScreen from '../Screens/CourseDetailScreen';

// Import the type definition for navigation (helps with TypeScript safety)
import { RootStackParamList } from '../Types';

// Create a Stack Navigator using your defined types
// This ensures correct parameters are passed between screens
const Stack = createStackNavigator<RootStackParamList>();

// Main function that returns your navigation structure
export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard" 
      screenOptions={{ headerShown: false }} 
    >
      
      {/* Dashboard Screen */}
      <Stack.Screen 
        name="Dashboard"              
        component={DashboardScreen}  
      />

      {/* Profile Screen */}
      <Stack.Screen 
        name="Profile"               
        component={ProfileScreen}    
        options={{ 
          animation: 'slide_from_right' 
        }} 
      />

      {/* Course Detail Screen */}
      <Stack.Screen 
        name="CourseDetail"              
        component={CourseDetailScreen}  
        options={{ 
          animation: 'slide_from_right' 
        }} 
      />

    </Stack.Navigator>
  );
}