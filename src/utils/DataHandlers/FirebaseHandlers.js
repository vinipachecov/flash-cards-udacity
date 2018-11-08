import firebase from 'firebase';
import { sendToast } from '../helpers';

/**
 * Do the signup sending 
 * email and password credentials to firebase
 * @param {*} email 
 * @param {*} password 
 */
export const signUp = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);    
      sendToast('Welcome to FlashCards!');      
      resolve(newUser);  
    } catch (error) {
      console.log(error);
      sendToast('Error signingUp new User');            
      reject(error);
    }
  });  
};


/**
 * Send the signIn request to
 * firebase backend to login
 * the user.
 * @param {*} email 
 * @param {*} password 
 */
export const signIn = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {      
      await firebase.auth().signInWithEmailAndPassword(email, password);          
      resolve();      
    } catch (error) {
      console.log(error);
      sendToast('Error signing in User, try again later.');      
      reject(error);
    }
  });    
};

/**
 * Send Async data to firebase
 * @param {JSON} deckData
 */
export const sendUserDeckData = (deckData) => {
  return new Promise(async (resolve, reject) => {
    try {      
      const user = firebase.auth().currentUser;
      firebase.database().ref(`/users/${user.uid}/decks`).update({
        ...deckData                        
      });      
      resolve();      
    } catch (error) {
      console.log(error);
      sendToast('Error sending deckList Data.');
      reject(error);
    }    
  });  
}

export const addUserDeck = (newDeck) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('deck a ser inserido = ', newDeck);
      const user = firebase.auth().currentUser;
      await firebase.database().ref(`/users/${user.uid}/decks/${newDeck.id}`).set({
        ...newDeck
      });
      resolve();
    } catch (error) {
      console.log(error);
      sendToast('Error adding Deck');
      reject(error);
    }    
  });  
}

export const addUpdatedDeck = (updatedDeck) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('deck a ser inserido = ', updatedDeck);
      const user = firebase.auth().currentUser;
      await firebase.database().ref(`/users/${user.uid}/decks/${updatedDeck.id}`).update({
        ...updatedDeck
      });
      resolve();
    } catch (error) {
      console.log(error);
      sendToast('Error adding Deck');
      reject(error);
    }    
  });  
}

export const retreiveUserData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = firebase.auth().currentUser;      
      await firebase.database().ref(`/users/${user.uid}`)
      .once('value', snapshot => {        
        resolve(snapshot.val());
      });      
    } catch (error) {
      console.log(error);      
      sendToast("Couldn't get user data, check internet connection!");
      reject(error);
    }    
  });  
}