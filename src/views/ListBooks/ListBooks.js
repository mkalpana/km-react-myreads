import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListBooks.css';
import BookShelf from "../../components/BookShelf/BookShelf";

class ListBooks extends Component {
  static propTypes = {
    onOpenSearch: PropTypes.func.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
    getAllBooks: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllBooks();
  }

  findBooks = (bookShelf) => {
    const { books } = this.props;
    return books.filter((book) => book.shelf === bookShelf);
  };

  render() {
    const { onOpenSearch, onChangeBookShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={this.findBooks('currentlyReading')} onChangeBookShelf={onChangeBookShelf} title="Currently Reading"/>
            <BookShelf books={this.findBooks('wantToRead')} onChangeBookShelf={onChangeBookShelf} title="Want to Read"/>
            <BookShelf books={this.findBooks('read')} onChangeBookShelf={onChangeBookShelf} title="Read"/>
          </div>
        </div>
        <div className="open-search">
          <a onClick={onOpenSearch}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default ListBooks;

