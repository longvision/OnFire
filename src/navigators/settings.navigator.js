import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Settings } from '../pages/Settings/Settings';

const Stack = createStackNavigator();

const KitchenNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);
export default KitchenNavigator;
