import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import MainPage from './MainPage'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  // changeShelf = (book, shelf) => {
  //   BooksAPI.update(book, shelf);

  //   BooksAPI.getAll().then((books) => {
  //     this.setState({ books:books })
  //   })
  // }

  changeShelf= (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({ books: this.state.books
        .filter(b => b.id !== book.id )
        .concat(book)}))
      }
    )
  };


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage 
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>

        <Route exact path='/search' render={() => (
          <SearchPage 
            changeShelf={this.changeShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp



