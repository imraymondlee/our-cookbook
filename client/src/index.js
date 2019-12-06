import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './components/App';
import { StateProvider } from './state';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Global State
const initialState = {
  userId: ''
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        userId: action.userId
      };
    default:
      return state;
  }
};

const client = new ApolloClient({ uri: process.env.REACT_APP_API_ENDPOINT+'/graphql' });

const ApolloApp = AppComponent => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  </StateProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));