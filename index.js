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
<<<<<<< HEAD
  tron.log('DEVELOPMENT MODE ON - Grammage ===================> App Start');
=======
  tron.log(
    'Reactotron DEVELOPMENT Configured - Grammage ===================> App Start',
  );
>>>>>>> ae2c67591a4ce6e213ef6b81c65d28bc866d154c
}

AppRegistry.registerComponent(appName, () => App);
