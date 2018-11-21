import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
