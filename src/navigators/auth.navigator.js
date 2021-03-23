import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '../pages/Auth/Login';
import {ForgotPassword} from '../pages/Auth/ForgotPassword';
import {SignUp} from '../pages/Auth/SignUp';
import {Recovery} from '../pages/Auth/Recovery';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="Recovery" component={Recovery} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
export default AuthNavigator;
