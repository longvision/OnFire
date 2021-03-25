import React, {useEffect} from 'react';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

export const AppNavigator = () => {
  const token = useSelector(state => state.auth.token);

  useEffect(() => {}, [token]);

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
