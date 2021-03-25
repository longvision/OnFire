import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {Platform, StatusBar} from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Spinner,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigator} from './src/navigators/navigation';
import {ThemeContext} from './theme-context';
import {default as theme} from './theme.json'; //
import {default as mapping} from './mapping.json'; // <-- Import app mapping
import {Provider} from 'react-redux';
import {getPersistor} from '@rematch/persist';
import store from './src/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {NavigationContainer} from '@react-navigation/native';

export default () => {
  const [dark, setDark] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = dark === 'light' ? 'dark' : 'light';
    setDark(nextTheme);
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={getPersistor()} />
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{dark, toggleTheme}}>
        <ApplicationProvider
          {...eva}
          theme={{...eva[dark], ...theme}}
          customMapping={mapping}>
          <NavigationContainer>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <AppNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};
