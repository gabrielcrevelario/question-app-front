import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import QuestionList from './questionList'

const client = new ApolloClient({
  uri: 'http://localhost:8080/'
})

function App() {
  return (
    //       <Users />
     <ApolloProvider client={client}>
        <main>
              <QuestionList />
        </main>
     </ApolloProvider>
  );
}

export default App;
