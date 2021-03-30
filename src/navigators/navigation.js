import React, {useEffect} from 'react';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';
import {Alert, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from '../atoms/Loading';
import {useSelector, useDispatch} from 'react-redux';

export const AppNavigator = () => {
  const token = useSelector(state => state.auth.token);

  useEffect(() => {}, [token]);

  return token ? <MainNavigator /> : <AuthNavigator />;
};
