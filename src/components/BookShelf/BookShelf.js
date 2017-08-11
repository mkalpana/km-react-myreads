import React from 'react';
import PropTypes from 'prop-types';
import './BookShelf.css';
import Books from '../Books/Books';

const BookShelf = (props) => {
  const { books, onChangeBookShelf, title } = props;

  return (books &&
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <Books books={books} onChangeBookShelf={onChangeBookShelf} />
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default BookShelf;
