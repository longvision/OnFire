import {createModel} from '@rematch/core';
import {Platform} from 'react-native';
import api from '../../services/api';
import tron from '../../config/ReactotronConfig';
import {checkDollarSign} from '../../utils/functions';
import {initReactI18next} from 'react-i18next';

export const files = createModel()({
  state: {
    files: [],
    selected: {},
    selectedId: null,
    failed: false,
  },
  reducers: {
    list(state, payload) {
      return {
        ...state,
        files: payload,
      };
    },
    addMeasure(state, payload) {
      return {
        ...state,
        files: [...state.files, payload],
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
      const newArray = state.files.filter(item => item.id !== payload);
      return {...state, files: newArray};
    },
  },
  effects: dispatch => ({
    async alertOff() {
      dispatch.files.understood();
    },
    async addAsync(payload, rootState) {
      try {
        const {folder, productId, uri} = payload;

        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        api.defaults.headers['Content-Type'] = 'multipart/form-data';
        api.defaults.headers.Accept = 'multipart/form-data';

        let formData = new FormData();

        const array = uri.split('/');
        const fileName = array.slice(-1)[0];

        if (Platform.OS === 'ios') {
          formData.append('image', {
            name: fileName,
            uri: uri.replace('file://', ''),
            product_id: productId,
          });
        } else {
          formData.append('image', {
            name: fileName,
            uri: uri,
          });
        }

        await api.post(
          `files?folder=${folder}&product_id=${productId}`,
          formData,
        );
      } catch (err) {
        // dispatch.files.failed();
      }
    },
    async listAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const response = await api.get('files');

        const {data} = response.data;

        tron.log(rootState);

        dispatch.files.list(data);

        // history.push('/dashboard');
      } catch (err) {}
    },
    async getAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;

        const {id} = payload;

        const response = await api.get(`files/${id}`);

        const {data} = response;

        dispatch.files.list(data);

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
          package_price: checkDollarSign(values.price.toString()),
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
        dispatch.files.delete(id);
      } catch (err) {}
    },
  }),
});
