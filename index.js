/**
 * @format
 */
import 'react-native-gesture-handler';

import {ENV} from '@env';
import './src/config/ReactotronConfig';
if (ENV === 'development') {
  tron.log('Reactotron Configured - Grammage ===================> App Start');
}
import tron from './src/config/ReactotronConfig';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './i18n';

AppRegistry.registerComponent(appName, () => App);
