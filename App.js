import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './src/reducers'
import ReduxThunk from 'redux-thunk'
import RootComponent from './src/Navigation/RootComponent';
import firebase from 'firebase';
import configs from './src/configs/firebaseConfigs';


const middleware = [ReduxThunk];
const store = createStore(reducers, {}, applyMiddleware(...middleware));
export default class App extends React.Component {

  componentWillMount() {
    const config = {
      apiKey: configs.apiKey,
      authDomain: configs.authDomain,
      databaseURL: configs.databaseURL,
      projectId: configs.projectId,
      storageBucket: configs.storageBucket,
      messagingSenderId: configs.messagingSenderId
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
  }
}
