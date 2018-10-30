import { SEND_NEW_DECK, RETRIEVE_DECKS, SELECTED_DECK } from "./ActionTypes";
import { AsyncStorage } from 'react-native';
import { AsyncStorageKey } from "../utils/keys";

export const addDeck = (deck, deckList) => {
  return async dispatch => {            
    const dados = await AsyncStorage.setItem(AsyncStorageKey, JSON.stringify([...deckList, deck]))
    dispatch({
    type: SEND_NEW_DECK,
    payload: deck
    })
  }
}

export const retrieveDecks = (decks) => ({
  type: RETRIEVE_DECKS,
  payload: decks
});  

   

export const selectDeck = (deck) => ({
  type: SELECTED_DECK,
  payload: deck
})
  
