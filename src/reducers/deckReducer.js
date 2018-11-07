import { 
  SEND_NEW_DECK,
  RETRIEVE_DECKS,
  SELECTED_DECK,
  ADD_CARD_TO_DECK
 } from "../actions/ActionTypes";

const initialState = {
  decks: [],
  selectedDeck: null
}

export default (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
  case SEND_NEW_DECK:  
    return { ...state, decks: [...state.decks, action.payload] };
  case RETRIEVE_DECKS:  
    return { ...state, decks: action.payload };
  case SELECTED_DECK:
    return { ...state, selectedDeck: action.payload };
  case ADD_CARD_TO_DECK: 
    return { 
      ...state, 
      decks: [...state.decks].map(deck => {
        return deck.id === action.payload.id ? action.payload : deck;
      }), 
      selectedDeck: action.payload 
    };
  default:
    return state;
  }
};
