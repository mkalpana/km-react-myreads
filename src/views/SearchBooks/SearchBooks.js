import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import './SearchBooks.css';


class SearchBooks extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired
  };

  static defaultProps = {
    searchResults: []
  };

  render() {
    const { onSearch, onClose, searchResults } = this.props;
    console.log(searchResults);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={onClose}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => e && onSearch(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
