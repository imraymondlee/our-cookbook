import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './components/App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: process.env.REACT_APP_API_ENDPOINT+'/graphql' });

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById('root'));