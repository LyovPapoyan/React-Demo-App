import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createBrowserHistory} from 'history';

import {store} from './store/store';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>       
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);
