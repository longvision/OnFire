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
  redux: {
    createStore: Reactotron.createStore,
    enhancers: [Reactotron.createEnhancer()],
  },
  models,
  plugins: [immerPlugin(), persistPlugin, loadingPlugin()],
});

export default store;
