/**
 * @format
 */
import 'react-native-gesture-handler';

import { ENV } from '@env';
import { AppRegistry } from 'react-native';
import tron from './src/config/ReactotronConfig';

import App from './App';
import { name as appName } from './app.json';
import './i18n';

if (ENV === 'development') {
  tron.log(
    'Reactotron DEVELOPMENT Configured - Grammage ===================> App Start',
  );
}

AppRegistry.registerComponent(appName, () => App);
