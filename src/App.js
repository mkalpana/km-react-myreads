import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import ListBooks from './views/ListBooks/ListBooks';
import SearchBooks from './views/SearchBooks/SearchBooks';

class BooksApp extends React.Component {
  state = {
    searchResults: [],
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  onSearchBooks = (query) => {
    if (query) {
      BooksAPI.search(query, 20)
        .then(results => this.updateSearchResultsWithShelfInfo(results));
    }
  };

  updateSearchResultsWithShelfInfo = (results) => {
    // Update the search results with shelf information.
    this.setState((state) => {
      let searchResults = results;
      state.books.map(book => {
        let foundBook = searchResults.find(b => b.id === book.id);
        if (foundBook) {
          foundBook.shelf = book.shelf;
        }
      });
      return { searchResults };
    });
  };

  onChangeBookShelf = (book, newShelf) => {
    if (book && newShelf) {
      BooksAPI.update(book, newShelf)
        .then((listBooks) => this.updateBooksShelvesInfo(listBooks, book, newShelf));
    }
  };

  updateBooksShelvesInfo = (listBooks, book, newShelf) => {
    // Update the book shelves based on API response.
    this.setState((state) => {
      let searchResults = state.searchResults;
      let books = state.books;
      searchResults.map(b => (b.shelf = 'none'));
      this.updateBooksShelf(listBooks, 'currentlyReading', searchResults);
      this.updateBooksShelf(listBooks, 'wantToRead', searchResults);
      this.updateBooksShelf(listBooks, 'read', searchResults);
      books.map(b => ((b.id === book.id) ? b.shelf = newShelf : null));
      return { books, searchResults };
    });
  };

  updateBooksShelf = (listBooks, bookShelf, searchResults) => {
    listBooks[bookShelf].map(bookId => {
      const item = searchResults.find(b => b.id === bookId);
      if (item) {
        item.shelf = bookShelf;
      }
    });
  };

  resetSearchResults = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    const { books, searchResults } = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={({ history }) => (
          <SearchBooks
            onSearch={this.onSearchBooks}
            onClose={() => history.push('/')}
            onChangeBookShelf={this.onChangeBookShelf}
            searchResults={searchResults}
            resetSearchResults={this.resetSearchResults}
          />
        )}/>
        <Route exact path="/" render={({ history }) => (
          <ListBooks
            onChangeBookShelf={this.onChangeBookShelf}
            onOpenSearch={() => history.push('/search')}
            getAllBooks={this.getAllBooks}
            books={books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
