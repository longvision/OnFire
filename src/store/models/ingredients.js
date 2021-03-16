import {createModel} from '@rematch/core';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';
export const ingredients = createModel()({
  state: {
    ingredients: [],
    selected: {},
    selectedId: null,
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
    add(state, payload) {
      return {...state, ingredients: [...state.ingredients, payload]};
    },
  },
  effects: (dispatch) => ({
    async addAsync(payload, rootState) {
      try {
        const {brand, ingredient, price, region, seller, size, unit} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.post('ingredient', {
          name: ingredient,
          brand: brand,
          seller: seller,
          sold_region: region,
          package_price: price.substring(1),
          unit: unit,
          package_size: size,
        });

        const {data} = response;
        dispatch.ingredients.add(data);
        // console.log(data);
      } catch (err) {}
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
      } catch (err) {
        console.log(err);
      }
    },
    async updateAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const {values, id} = payload;
        console.log(payload);
        await api.patch(`ingredient/${id}`, {
          name: values.ingredient,
          package_price: values.price.substring(1),
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
