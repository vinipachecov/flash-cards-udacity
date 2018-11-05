import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './src/reducers'
import ReduxThunk from 'redux-thunk'
import RootComponent from './src/Navigation/RootComponent'


const middleware = [ReduxThunk];
const store = createStore(reducers, {}, applyMiddleware(...middleware))
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootComponent />
      </Provider>
    );
  }
}


