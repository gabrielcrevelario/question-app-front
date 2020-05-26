import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import QuestionList from './questionList'

const client = new ApolloClient({
  uri: 'http://localhost:8080/'
})
const main = React.useRef()
function scrollFunc(e) {
  debugger
  console.log(main.current.scrollTop)
}
function App() {
  return (
    //       <Users />
     <ApolloProvider client={client}>
       <header>
          <h1>WebPage para criação de questões e alternativas</h1>
       </header>
        <main ref={this.main} onScroll={e => scrollFunc(e)}  >
              <QuestionList />
        </main>
     </ApolloProvider>
  );
}

export default App;
