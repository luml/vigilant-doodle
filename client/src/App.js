import './App.css';
import Books from './Books';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import AddBook from './AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="App-header">
          <h2>CRM</h2>
          <AddBook />
          <Books />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
