import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import App from './components/App';
import reducers  from './stateHandlers/reducers';
import './index.css';

const store = createStore(reducers,
  applyMiddleware(
    thunkMiddleware,
  ));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
