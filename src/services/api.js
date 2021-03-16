import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.2.2:3333/', //Android
  // baseURL: 'http://localhost:3333/', //Android Localhost
  baseURL: 'http://localhost:3333/', //iOS
  // baseURL: 'https://recipeapi-dev.onrender.com/', //iOS
  // baseURL: 'https://nodedeploy.smartflashcards.app/', //producao
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'},
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
