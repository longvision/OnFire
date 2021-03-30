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
    success: false,
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
    success(state, payload) {
      return {
        ...state,
        success: true,
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
        success: false,
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
        api.defaults.headers.Accept = 'application/json';

        let formData = new FormData();

        const array = uri.split('/');
        const fileName = array.slice(-1)[0];

        if (Platform.OS === 'ios') {
          formData.append('image', {
            name: fileName,
            uri: uri.replace('file://', ''),
            type: 'image/jpeg',
          });
        } else {
          formData.append('image', {
            name: fileName,
            uri: uri,
            type: 'image/jpeg',
          });
        }

        const res = await api.post(
          `files?folder=${folder}&product_id=${productId}`,
          formData,
        );
        const {data} = res;

        dispatch.recipes.addImage({
          product_id: data.product_id,
          url: data.url,
          name: data.name,
        });
        return res;
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

    async deleteAsync(payload, rootState) {
      try {
        api.defaults.headers.Authorization = `Bearer ${rootState.auth.token}`;
        const {name, product_id} = payload;

        await api.delete(`files/${name}`);
        dispatch.recipes.removeImage({product_id: product_id});
      } catch (err) {}
    },
  }),
});
