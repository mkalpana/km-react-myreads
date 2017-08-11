import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';

const Book = (props) => {
  console.log(props.book);
  const { book: { title, authors, shelf, imageLinks }, onChangeBookShelf } = props;
  const { thumbnail } = imageLinks || {};
  return(
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }} />
        <div className="book-shelf-changer">
          <select value={shelf ? shelf : 'none'} onChange={(e) => onChangeBookShelf(props.book, e.target.value)}>
            <option value="moveTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
};

Book.defaultPropTypes = {
  book: {}
};

export default Book;
