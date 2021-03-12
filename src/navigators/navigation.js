import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';

import {useSelector} from 'react-redux';
import {Layout} from '@ui-kitten/components';
export const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {}, [token]);

  return (
    <NavigationContainer>
      <Layout style={{height: '100%'}}>
        {token ? <MainNavigator /> : <AuthNavigator />}
      </Layout>
    </NavigationContainer>
  );
};
