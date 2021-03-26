import axios from 'axios';
import {Platform} from 'react-native';

import {ENV} from '@env';
// baseURL: 'http://10.0.1.1:3333/', //Android Device
// baseURL: 'http://192.168.1.200:3333/', //Android Localhost
// baseURL: 'http://127.168.1.200:3333/', //Android Localhost

const prod = 'https://recipeapi-dev.onrender.com/';

const dev =
  Platform.OS === 'android'
    ? 'http://127.168.1.200:3333/'
    : 'http://localhost:3333/';

const api = axios.create({
  baseURL: ENV === 'development' ? dev : prod,
});

export default api;
// //Auth APIs

// export const signUp = async (name, email, password) => {
//   const resp = await api.post('/users/signup', {name, email, password});
//   return resp;
// };

// //Deck APIs

// export const getAllDecks = async (userId) => {
//   const resp = await api.get(`/decks/${userId}`);
//   return resp.data;
// };

// //Cards APIs

// export const getDeckCards = async (deckId) => {
//   const resp = await api.get(`/cards/deck/${deckId}`);

//   return resp.data;
// };
// export const createCard = async (frontside, backside, deckId) => {
//   const resp = await api.post('/cards/new/', {frontside, backside, deckId});

//   return resp.data;
// };
// export const archiveCard = async (cardId, archived) => {
//   const resp = await api.patch(`/cards/archive/${cardId}/`, {
//     archived: archived,
//   });

//   return resp.data;
// };
// export const deleteCard = async (cardId) => {
//   const resp = await api.delete(`/cards/${cardId}`);

//   return resp.data;
// };
