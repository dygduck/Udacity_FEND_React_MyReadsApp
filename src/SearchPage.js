import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.receiveSearchedBooks(query);
  }

  receiveSearchedBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) {
          this.setState({ searchedBooks: [] })
        } else {
          this.setState({ searchedBooks:searchedBooks })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
            to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query} 
              type="text" 
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(
                event.target.value
              )}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(searchedBook => {
              var shelf = 'none'

              this.props.books.map(book => (
                book.id === searchedBook.id ?
                shelf= book.shelf :
                ''
              ))
              return (
                <li key={searchedBook.id}>
                  <Book
                    book={searchedBook}
                    changeShelf={this.props.changeShelf}
                    currentShelf={shelf}
                  />
                </li>
              )

              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;