import React, {useEffect} from 'react';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

export const AppNavigator = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const recipesChange = useSelector(state => state.loading.models.recipes);
  const fileAdded = useSelector(state => state.loading.models.files);

  useEffect(() => {
    if (token) {
      dispatch.ingredients.listAsync();
      dispatch.recipes.listAsync();
    }
  }, [token]);

  useEffect(() => {}, [recipesChange, fileAdded]);

  return (
    // <Stack.Navigator headerMode="none">
    <>
      {token ? (
        // <Stack.Screen
        //   name="Home"
        //   headerShown={false}
        //   component={MainNavigator}
        // />
        <MainNavigator />
      ) : (
        // <Stack.Screen
        //   name="Auth"
        //   headerShown={false}
        //   component={AuthNavigator}
        // />
        <AuthNavigator />
      )}
    </>
    // </Stack.Navigator>
  );
  // return token ? <MainNavigator /> : <AuthNavigator />;
};
