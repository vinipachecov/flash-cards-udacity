import { SEND_NEW_DECK, RETRIEVE_DECKS, SELECTED_DECK, ADD_CARD_TO_DECK } from "./ActionTypes";
import { AsyncStorage } from 'react-native';
import { AsyncStorageKey } from "../utils/keys";

export const addDeck = (deck, deckList) => {
  return async dispatch => {      
    try {      
      const newDeckList = { ...deckList };
      newDeckList[deck.title] = deck;
      console.log('novo deckList = ', newDeckList);
      const dados = await AsyncStorage.mergeItem(AsyncStorageKey, JSON.stringify(newDeckList))
    } catch (error) {
      console.log(error);      
    }          
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

export const addCardToDeck = (decks, deckWithAddedCard) => {
  return async dispatch => {
    console.log('deck com card adicionado = ', deckWithAddedCard)
    const newDeckList = decks.map(item => {
      return item.title === deckWithAddedCard.title ? deckWithAddedCard : item;
    });    
    try {            
      const res = await AsyncStorage.setItem(AsyncStorageKey, JSON.stringify(newDeckList));  
      dispatch({ type: ADD_CARD_TO_DECK, payload: { newDeckList, deckWithAddedCard } });
    } catch (error) {
      console.log(error);      
    }    
  };
}
  
