import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';
export const ingredients = createModel()({
  state: {
    ingredients: [],
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        ingredients: payload.data,
      };
    },
    signOut(state) {
      return {...state, token: null};
    },
  },
  effects: (dispatch) => ({
    async addAsync(payload, rootState) {
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
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('ingredients');

        const {data} = response.data;

        tron.log(rootState);

        dispatch.ingredients.list({data});

        // history.push('/dashboard');
      } catch (err) {}
    },
  }),
});
