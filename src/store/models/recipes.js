import { createModel } from '@rematch/core';
import api from '../../services/api';

const recipes = createModel()({
  state: {
    recipes: [],
    page: 1,
    lastPage: 1,
    fetchMore: false,
    selected: {},
    selectedId: null,
  },
  reducers: {
    list(state, payload) {
      const { items, lastPage } = payload;
      return {
        ...state,
        lastPage,
        recipes: items,
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
      return {
        ...state,

        recipes: [...state.recipes, payload],
      };
    },
    addMore(state, payload) {
      const { items, lastPage, page } = payload;
      return {
        ...state,
        lastPage,
        page,
        recipes: [...state.recipes, ...items],
      };
    },
    removeImage(state, payload) {
      const { product_id } = payload;

      const selected = state.recipes.filter((item) => item.id === product_id);
      // Zera o array de imagens do objeto.
      selected[0].files = [];

      return { ...state, recipes: [...state.recipes, selected] };
    },

    addImage(state, payload) {
      const { product_id, url, name } = payload;

      const selected = state.recipes.filter((item) => item.id === product_id);
      // Zera o array de imagens do objeto.
      selected.files = [{ product_id, url, name }];

      return { ...state, recipes: [...state.recipes, selected] };
    },
    fetchMore(state, payload) {
      return { ...state, fetchMore: payload };
    },
  },
  effects: (dispatch) => ({
    async addAsync(payload, rootState) {
      try {
        const { name, description } = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        api.defaults.headers['content-type'] = 'application/json';
        const res = await api.post('product', {
          title: name,
          description,
        });

        dispatch.recipes.add(res.data);
      } catch (err) {}
    },
    async updateAsync(payload, rootState) {
      try {
        const { product_id } = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        api.defaults.headers['content-type'] = 'application/json';
        await api.patch(`/product/${product_id}`);
      } catch (err) {}
    },
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('products');

        const { data, lastPage } = response.data;

        dispatch.recipes.list({ items: data, lastPage });
      } catch (err) {}
    },
    async loadMoreAsync(payload, rootState) {
      try {
        if (
          rootState.recipes.fetchMore === true &&
          rootState.recipes.page < rootState.recipes.lastPage
        ) {
          const { nextPage } = payload;

          api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
          api.defaults.headers['content-type'] = 'application/json';

          const response = await api.get(`products?page=${nextPage}`);
          const { data, lastPage, page } = response.data;

          dispatch.recipes.addMore({ items: data, lastPage, page });
          dispatch.recipes.fetchMore(false);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const { id } = payload;
        await api.delete(`product/${id}`);
      } catch (err) {}
    },

    async setSelectedAsync(payload) {
      dispatch.recipes.setSelected(payload);
    },
  }),
});
export default recipes;
