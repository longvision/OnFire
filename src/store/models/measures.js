import React from 'react';
import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';

import {checkDollarSign} from '../../utils/functions';

export const measures = createModel()({
  state: {
    measures: [],
    selected: {},
    selectedId: null,
    failed: false,
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        measures: payload,
      };
    },
    addMeasure(state, payload) {
      return {
        ...state,
        measures: [...state.measures, payload],
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
    failed(state, payload) {
      return {
        ...state,
        failed: true,
      };
    },
    understood(state, payload) {
      return {
        ...state,
        failed: false,
      };
    },
    add(state, payload) {
      return {...state, ingredients: [...state.ingredients, payload]};
    },
    delete(state, payload) {
      const newArray = state.measures.filter((item) => item.id !== payload);
      return {...state, measures: newArray};
    },
  },
  effects: (dispatch) => ({
    async alertOff(payload, rootState) {
      dispatch.measures.understood();
    },
    async addAsync(payload, rootState) {
      // API Object
      // "product_id": 1,
      // "quantity": 10,
      // "unit": "mL",
      // "ingredient_id": 2

      try {
        const {values, productId, ingredientId} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        console.log(values);
        const measure = await api.post('measure', {
          product_id: productId,
          quantity: checkDollarSign(values.quantity),
          ingredient_id: ingredientId,
          unit: values.unit,
        });

        dispatch.measures.addMeasure(measure.data);
      } catch (err) {
        dispatch.measures.failed();
      }
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

        const {id} = payload;

        const response = await api.get(`measures/${id}`);

        const {data} = response;

        dispatch.measures.list(data);

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
    async setSelectedAsync(payload) {
      dispatch.ingredients.setSelected(payload);
    },
    async deleteAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const {id} = payload;

        await api.delete(`measure/${id}`);
        dispatch.measures.delete(id);
      } catch (err) {}
    },
  }),
});
