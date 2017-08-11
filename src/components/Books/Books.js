import React from 'react';
import PropTypes from 'prop-types';
import './Books.css';
import Book from '../Book/Book';

const Books = (props) => {
  const { books, onChangeBookShelf } = props;

  return (
    <ol className="books-grid">
      {books && books.map((book, index) => (
        <li key={index}>
          <Book book={book} onChangeBookShelf={onChangeBookShelf} />
        </li>
      ))}
    </ol>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
};

Books.defaultPropTypes = {
  books: []
};

export default Books;
