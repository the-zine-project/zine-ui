import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createHistory();

const enhancers = [];
const middlewares = [routerMiddleware(history)];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(rootReducer, composedEnhancers);

export default store;
