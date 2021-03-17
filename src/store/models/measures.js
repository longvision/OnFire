import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';

import {checkDollarSign} from '../../utils/functions';

export const measures = createModel()({
  state: {
    measures: [],
    selected: {},
    selectedId: null,
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        measures: payload,
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
      return {...state, ingredients: [...state.ingredients, payload]};
    },
  },
  effects: (dispatch) => ({
    async addAsync(payload, rootState) {
      // API Object
      // "product_id": 1,
      // "quantity": 10,
      // "unit": "mL",
      // "ingredient_id": 2

      try {
        const {values, ingredientId, productId} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        await api.post('measure', {
          product_id: productId,
          quantity: Number(values.quantity),
          ingredient_id: ingredientId,
          unit: values.unit,
        });

        console.log('success');

        // console.log(data);
      } catch (err) {}
    },
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('measures');

        const {data} = response.data;

        tron.log(rootState);

        dispatch.measures.list(data);

        // history.push('/dashboard');
      } catch (err) {}
    },
    async getAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get(`ingredient/${payload}`);

        const data = response.data;

        dispatch.ingredients.setSelected(data);

        // history.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    async updateAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const {values, id} = payload;

        await api.patch(`ingredient/${id}`, {
          id: id,
          name: values.ingredient,
          package_price: checkDollarSign(values.price),
          package_size: values.size,
          unit: values.unit,
          seller: values.seller,
          sold_region: values.region,
          brand: values.brand,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async setSelectedIdAsync(payload) {
      dispatch.ingredients.setSelectedId(payload);
    },
  }),
});