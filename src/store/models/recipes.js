import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';

import {checkDollarSign} from '../../utils/functions';
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
  effects: (dispatch) => ({
    async addAsync(payload, rootState) {
      try {
        const {brand, ingredient, price, region, seller, size, unit} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.post('product', {
          name: ingredient,
          brand: brand,
          seller: seller,
          sold_region: region,
          package_price: checkDollarSign(price),
          unit: unit,
          package_size: size,
        });

        const {data} = response;
        dispatch.recipes.add(data);
        // console.log(data);
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
    // async getAsync(payload, rootState) {
    //   try {
    //     api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

    //     const response = await api.get(`ingredient/${payload}`);

    //     const data = response.data;

    //     dispatch.recipes.setSelected(data);

    //     // history.push('/dashboard');
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async updateAsync(payload, rootState) {
    //   try {
    //     api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
    //     const {values, id} = payload;

    //     await api.patch(`ingredient/${id}`, {
    //       id: id,
    //       name: values.ingredient,
    //       package_price: checkDollarSign(values.price),
    //       package_size: values.size,
    //       unit: values.unit,
    //       seller: values.seller,
    //       sold_region: values.region,
    //       brand: values.brand,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async setSelectedAsync(payload) {
      dispatch.recipes.setSelected(payload);
    },
  }),
});
