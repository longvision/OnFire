import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';

export const recipes = createModel()({
  state: {
    recipes: [],
    selected: {},
    selectedId: null,
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        recipes: payload,
      };
    },
    setSelected(state, payload) {
      return {
        ...state,
        selected: payload,
      };
    },
    setSelectedId(state, payload) {
      return {
        ...state,
        selectedId: payload,
      };
    },

    add(state, payload) {
      return {...state, recipes: [...state.recipes, payload]};
    },
  },
  effects: dispatch => ({
    async addAsync(payload, rootState) {
      try {
        const {name, description} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const res = await api.post('product', {
          title: name,
          description: description,
        });

        dispatch.recipes.add(res.data);
      } catch (err) {}
    },
    async updateAsync(payload, rootState) {
      try {
        const {product_id} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        await api.patch(`/product/${product_id}`);
      } catch (err) {}
    },
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('products');

        const {data} = response.data;

        tron.log(rootState);

        dispatch.recipes.list(data);

        // history.push('/dashboard');
      } catch (err) {}
    },
    async deleteAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const {id} = payload;
        await api.delete(`product/${id}`);
      } catch (err) {}
    },

    async setSelectedAsync(payload) {
      dispatch.recipes.setSelected(payload);
    },
  }),
});
