import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from 'reducers';
// import rootSaga from 'sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middlewares = [routerMiddleware(history), sagaMiddleware];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares),
  ...enhancers
);

const store = createStore(rootReducer, composedEnhancers);

// sagaMiddleware.run(rootSaga);

export default store;
