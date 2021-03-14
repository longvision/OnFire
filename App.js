import React from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Spinner,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
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
            <AppNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};
