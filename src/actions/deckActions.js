import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { SEND_NEW_DECK, RETRIEVE_DECKS, SELECTED_DECK, ADD_CARD_TO_DECK } from "./ActionTypes";
import { AsyncStorageKey } from '../utils/keys';
import { createNotification, NOTIFICATION_KEY } from '../utils/helpers';

export const addDeck = (deck) => {
  return async dispatch => {      
    try {            
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);          
        if (status === 'granted') {          
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          );
        }   
      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));            
      await AsyncStorage.mergeItem(AsyncStorageKey, JSON.stringify({
        [deck.id]: deck
      }));
      dispatch({
        type: SEND_NEW_DECK,
        payload: deck
        });
    } catch (error) {
      console.log(error);      
    }              
  };
};

export const onUpdateDeck = (deck) => {
  return async dispatch => {
    try {                        
      await AsyncStorage.mergeItem(AsyncStorageKey, JSON.stringify({
        [deck.id]: deck
      }));
      // to update the deck on Redux
      dispatch({ type: ADD_CARD_TO_DECK, payload: deck });
    } catch (error) {
      console.log(error);      
    }              
  };  
}

export const retrieveDecks = (decks) => ({
  type: RETRIEVE_DECKS,
  payload: decks
});  
   

export const selectDeck = (deck) => ({
  type: SELECTED_DECK,
  payload: deck
});

export const addCardToDeck = (deckWithAddedCard) => {
  return async dispatch => {    
    try {        
      await AsyncStorage.mergeItem(AsyncStorageKey, JSON.stringify({
        [deckWithAddedCard.id]: deckWithAddedCard
      }));  
      dispatch({ type: ADD_CARD_TO_DECK, payload: deckWithAddedCard });
    } catch (error) {
      console.log(error);      
    }    
  };
}

  
