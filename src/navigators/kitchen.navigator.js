import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MyKitchen from '../pages/MyKitchen';
import RecipeDetail from '../pages/Recipe/RecipeDetail';
import { IngredientDetail } from '../pages/Ingredient/IngredientDetail';
import { AddIngredient } from '../pages/Ingredient/AddIngredient';
import { AddMeasure } from '../pages/Measure/AddMeasure';
import { AddRecipe } from '../pages/Recipe/AddRecipe';
import { Camera } from '../pages/Camera/Camera';
import { Picture } from '../pages/Camera/Picture';

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
    <Stack.Screen name="AddRecipe" component={AddRecipe} />
    <Stack.Screen name="AddMeasure" component={AddMeasure} />
    <Stack.Screen name="Camera" component={Camera} />
    <Stack.Screen name="Picture" component={Picture} />
  </Stack.Navigator>
);
export default KitchenNavigator;
