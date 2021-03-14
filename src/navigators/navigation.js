import React, {useEffect} from 'react';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';

import {useSelector} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';

export const AppNavigator = () => {
  const [storage, setStorage] = React.useState(null);
  const [token, setToken] = React.useState(false);

  useEffect(() => {
    async function getLocalStorage() {
      const data = await AsyncStorage.getItem('persist:root');
      setStorage(JSON.parse(data));
      setToken(JSON.parse(JSON.parse(data).auth).token);
    }
    getLocalStorage();
  }, [token]);

  const Stack = createStackNavigator();

  // return (
  //   <Stack.Navigator>
  //     {token ? (
  //       <Stack.Screen name="Home" component={MainNavigator} />
  //     ) : (
  //       <Stack.Screen name="Auth" component={AuthNavigator} />
  //     )}
  //   </Stack.Navigator>
  // );
  return token ? <MainNavigator /> : <AuthNavigator />;
};
