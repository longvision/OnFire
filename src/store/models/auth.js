import AsyncStorage from '@react-native-async-storage/async-storage';
import {createModel} from '@rematch/core';
import {Alert} from 'react-native';
import api from '../../services/api';

export const auth = createModel()({
  state: {
    token: null,
    recoveryToken: false,
    failed: false,
  },
  reducers: {
    login(state, payload) {
      return {
        ...state,
        token: payload.token,
      };
    },
    signOut(state) {
      return {...state, token: null};
    },
    forgotPassword(state) {
      return {...state, recoveryToken: true};
    },
    failed(state) {
      return {...state, failed: true};
    },
    understood(state) {
      return {...state, failed: false, recoveryToken: false};
    },
    clearStore(state) {
      return {};
    },
  },
  effects: (dispatch) => ({
    async loginAsync(payload, rootState) {
      try {
        const data = await AsyncStorage.getItem('persist:root');
        const localToken = JSON.parse(JSON.parse(data).auth).token;
        if (localToken) {
          dispatch.auth.login({token: localToken});
        } else {
          const {email, password} = payload;

          const response = await api.post('sessions', {
            email,
            password,
          });

          const {token} = response.data;

          // api.defaults.headers.Authorization = `Bearer ${token}`;

          dispatch.auth.login({token: token});
        }

        // history.push('/dashboard');
      } catch (err) {}
    },
    async signOutAsync() {
      dispatch.auth.signOut();
      dispatch.auth.clearStore();
    },
    async forgotPasswordAsync(payload) {
      try {
        const {email} = payload;

        await api.post('passwords', {
          email: email,
        });
        dispatch.auth.forgotPassword();
      } catch (err) {
        dispatch.auth.failed();
      }
    },
    async alertOff() {
      dispatch.auth.understood();
    },
  }),
});
