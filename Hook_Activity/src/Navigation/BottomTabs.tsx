import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TaskBoardScreen      from '../screens/TaskBoardScreen';
import HooksGuideScreen     from '../screens/HooksGuideScreen';
import CommonMistakesScreen from '../screens/CommonMistakesScreen';
import AboutScreen          from '../screens/AboutScreen';
import { useTheme }         from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  Tasks:    { active: 'checkmark-done',       inactive: 'checkmark-done-outline'    },
  Guide:    { active: 'bulb',                 inactive: 'bulb-outline'              },
  Mistakes: { active: 'warning',              inactive: 'warning-outline'           },
  About:    { active: 'information-circle',   inactive: 'information-circle-outline'},
};

export default function BottomTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor:  colors.border,
          borderTopWidth:  1,
          height:          60,
          paddingBottom:   8,
        },
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.subtext,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          return <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Tasks"    component={TaskBoardScreen}      />
      <Tab.Screen name="Guide"    component={HooksGuideScreen}     />
      <Tab.Screen name="Mistakes" component={CommonMistakesScreen} />
      <Tab.Screen name="About"    component={AboutScreen}          />
    </Tab.Navigator>
  );
}
