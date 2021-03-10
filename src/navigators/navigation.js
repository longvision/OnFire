import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthNavigator, TabNavigator} from './tab.navigator';

import {useSelector} from 'react-redux';
export const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {}, [token]);

  return (
    <NavigationContainer>
      {token ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
