import { createModel } from '@rematch/core';

import api from '../../services/api';

export const auth = createModel()({
  state: {
    token: null,
    recoveryToken: false,
    failed: false,
    success: false,
  },
  reducers: {
    login(state, payload) {
      return {
        ...state,
        token: payload.token,
      };
    },
    signOut(state) {
      return { ...state, token: null };
    },
    forgotPassword(state) {
      return { ...state, recoveryToken: true };
    },
    failed(state) {
      return { ...state, failed: true };
    },
    understood(state) {
      return {
        ...state,
        failed: false,
        recoveryToken: false,
        success: false,
      };
    },
    clearStore(state) {
      return {};
    },
    success(state) {
      return { ...state, success: true };
    },
  },
  effects: (dispatch) => ({
    async loginAsync(payload, rootState) {
      try {
        // const data = await AsyncStorage.getItem('persist:root');
        // const localToken = JSON.parse(JSON.parse(data).auth).token;
        // if (localToken) {
        //   dispatch.auth.login({token: localToken});
        // } else {
        // api.defaults.headers['content-type'] = 'application/json';
        const { email, password } = payload;
        const response = await api.post('sessions', {
          email,
          password,
        });

        const { token } = response.data;

        dispatch.auth.login({ token });
      } catch (err) {}
    },
    async signOutAsync() {
      dispatch.auth.signOut();
      dispatch.auth.clearStore();
    },
    async resetAsync(payload) {
      try {
        api.defaults.headers['content-type'] = 'application/json';

        const { password, confirmation, token } = payload;

        await api.put('passwords', {
          token: token.join(''),
          password,
          password_confirmation: confirmation,
        });

        dispatch.auth.success();
      } catch (err) {
        dispatch.auth.failed();
      }
    },
    async forgotPasswordAsync(payload) {
      try {
        const { email } = payload;
        api.defaults.headers['content-type'] = 'application/json';

        await api.post('passwords', {
          email,
        });
        dispatch.auth.forgotPassword();
      } catch (err) {
        dispatch.auth.failed();
      }
    },
    async signUpAsync(payload) {
      try {
        api.defaults.headers['content-type'] = 'application/json';
        const { email, username, password } = payload;
        await api.post('users', {
          email,
          username,
          password,
        });

        dispatch.auth.success();
      } catch (err) {
        dispatch.auth.failed();
      }
    },
    async alertOff() {
      dispatch.auth.understood();
    },
  }),
});
