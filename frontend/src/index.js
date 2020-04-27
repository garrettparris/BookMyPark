import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/App';
import { loadState, saveState} from './reducers/localStorage';
import * as serviceWorker from './serviceWorker';

const persistedState = loadState();
const store = createStore(
    reducers,
    persistedState
);

store.subscribe(() => {
  saveState({
    loggedIn: store.getState().loggedIn,
    accessToken: store.getState().accessToken,
    refreshToken: store.getState().refreshToken,
  });
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();