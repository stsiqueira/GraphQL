
import React from 'react';
import './App.css';
import AddContact from './components/forms/addContact';
import Title  from './components/layouts/Title';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Contacts from './components/lists/Contacts';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
const App = () => {
  return(
    <ApolloProvider client={client}>
      <div className="App">
        <Title/>
        <AddContact />
        <Contacts />
      </div>
    </ApolloProvider>
  ) 
    
}

export default App;
