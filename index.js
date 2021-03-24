/**
 * @format
 */
import {ENV} from '@env';
import './src/config/ReactotronConfig';
if (ENV === 'development') {
  tron.log('Reactotron Configured - OnFire ===================> App Start');
}
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import tron from './src/config/ReactotronConfig';
import './i18n';

AppRegistry.registerComponent(appName, () => App);
