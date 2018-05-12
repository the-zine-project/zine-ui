import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'store';
import { ApolloProvider } from 'react-apollo';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './styles/index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import client from './graphql/client';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
