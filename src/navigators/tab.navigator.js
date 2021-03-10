import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  ViewPager,
} from '@ui-kitten/components';

import {FeedScreen} from '../pages/Feed';
import {AddScreen} from '../pages/Add';
import {MyKitchen} from '../pages/MyKitchen';
import {RecipeDetail} from '../pages/RecipeDetail';
import {IngredientDetail} from '../pages/IngredientDetail';

import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import SignUp from '../pages/Auth/SignUp';

const FeedIcon = (props) => <Icon {...props} name="home-outline" />;

const PostIcon = (props) => <Icon {...props} name="plus-circle-outline" />;

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigationTabThemingShowcase = ({navigation, state}) => {
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={FeedIcon} title="FEED" />
      <BottomNavigationTab icon={PostIcon} title="MY KITCHEN" />
      <BottomNavigationTab icon={SearchIcon} title="SEARCH" />
    </BottomNavigation>
  );
};
export const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomNavigationTabThemingShowcase {...props} />}>
    <Screen name="Feed" component={FeedScreen} />
    <Screen name="MyKitchen" component={MyKitchen} />
    <Screen name="SearchRecipes" component={AddScreen} />
    <Screen name="RecipeDetail" component={RecipeDetail} />
    <Screen name="IngredientDetail" component={IngredientDetail} />
  </Navigator>
);
export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
