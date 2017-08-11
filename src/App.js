import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './util/BooksAPI';
import './App.css';
import ListBooks from './views/ListBooks/ListBooks';
import SearchBooks from './views/SearchBooks/SearchBooks';

class BooksApp extends React.Component {
  state = {
    searchBooks: [],
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        console.log(books);
        this.setState({ books });
      });
  }

  onSearchBooks = (searchTerm) => {
    BooksAPI.search(searchTerm, 20)
      .then(searchBooks => {
        console.log(searchBooks);
        this.setState({ searchBooks });
      })
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({ history }) => (
          <SearchBooks
            onSearch={this.onSearchBooks}
            onClose={() => history.push('/')}
            searchResults={[]}
          />
        )}/>
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            onOpenSearch={() => history.push('/search')}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
