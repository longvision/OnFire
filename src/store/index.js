import {init} from '@rematch/core';
import immerPlugin from '@rematch/immer';
import createPersistPlugin from '@rematch/persist';
import loadingPlugin from '@rematch/loading';
import {models} from './models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../config/ReactotronConfig';

const persistPlugin = createPersistPlugin({
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  whitelist: ['auth'],
});

const store = init({
  name: 'OnFire',
  models,
  plugins: [immerPlugin(), persistPlugin, loadingPlugin()],
  redux: {
    enhancers: [Reactotron.createEnhancer()],
  },
});

export default store;
