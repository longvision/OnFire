import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {MyKitchen} from '../pages/MyKitchen';
import {RecipeDetail} from '../pages/RecipeDetail';
import {IngredientDetail} from '../pages/Ingredient/IngredientDetail';
import {AddIngredient} from '../pages/Ingredient/AddIngredient';

const Stack = createStackNavigator();

const KitchenNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="MyKitchen" component={MyKitchen} />
    <Stack.Screen name="AddIngredient" component={AddIngredient} />
    <Stack.Screen name="IngredientDetail" component={IngredientDetail} />

    <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
  </Stack.Navigator>
);
export default KitchenNavigator;
