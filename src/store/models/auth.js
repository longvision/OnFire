import {createModel} from '@rematch/core';
import api from '../../services/api';

export const auth = createModel()({
  state: {
    token: null,
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
  },
  effects: (dispatch) => ({
    async loginAsync(payload, rootState) {
      try {
        const {email, password} = payload;

        const response = await api.post('sessions', {
          email,
          password,
        });

        const {token} = response.data;

        // api.defaults.headers.Authorization = `Bearer ${token}`;

        dispatch.auth.login({token});

        // history.push('/dashboard');
      } catch (err) {}
    },
    async signOutAsync() {
      dispatch.auth.signOut();
      dispatch.auth.clearStore();
    },
  }),
});
