import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';

import {checkDollarSign} from '../../utils/functions';
import {Alert} from 'react-native';
export const ingredients = createModel()({
  state: {
    ingredients: [],
    selected: {},
    selectedId: null,
    failed: false,
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        ingredients: payload,
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
    failed(state) {
      return {
        ...state,
        failed: true,
      };
    },
    understood(state) {
      return {
        ...state,
        failed: false,
      };
    },
    add(state, payload) {
      return {...state, ingredients: [...state.ingredients, payload]};
    },
  },
  effects: (dispatch) => ({
    async alertOff(payload, rootState) {
      dispatch.measures.understood();
    },
    async addAsync(payload, rootState) {
      try {
        const {brand, ingredient, price, region, seller, size, unit} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        console.log(price);
        const response = await api.post('ingredient', {
          name: ingredient,
          brand: brand,
          seller: seller,
          sold_region: region,
          package_price: checkDollarSign(price),
          unit: unit,
          package_size: size,
        });

        const {data} = response;
        // dispatch.ingredients.add(data);
        // console.log(data);
      } catch (err) {
        dispatch.measures.failed();
      }
    },
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('ingredients');

        const {data} = response.data;

        tron.log(rootState);

        dispatch.ingredients.list(data);

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
      } catch (err) {}
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
      } catch (err) {}
    },
    async setSelectedIdAsync(payload) {
      dispatch.ingredients.setSelectedId(payload);
    },
  }),
});
