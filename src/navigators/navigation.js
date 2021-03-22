import React, {useEffect} from 'react';

import AuthNavigator from './auth.navigator';
import MainNavigator from './bottom.navigator';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
  }, []);

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
