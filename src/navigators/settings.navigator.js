import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Settings} from '../pages/Settings/Settings';
import {RecipeDetail} from '../pages/Recipe/RecipeDetail';
import {IngredientDetail} from '../pages/Ingredient/IngredientDetail';
import {AddIngredient} from '../pages/Ingredient/AddIngredient';
import {AddMeasure} from '../pages/Measure/AddMeasure';

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
