import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import createPersistPlugin from '@rematch/persist';
import loadingPlugin from '@rematch/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from '../config/ReactotronConfig';
import { models } from './models';

const persistPlugin = createPersistPlugin({
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  whitelist: ['auth'],
});

const store = init({
  name: 'Grammage',
  redux: {
    createStore: Reactotron.createStore,
    enhancers: [Reactotron.createEnhancer()],
  },
  models,
  plugins: [immerPlugin(), persistPlugin, loadingPlugin()],
});

export default store;
