import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from '../components/BookShelf'

export default class Search extends Component {

    state = {
        searchedBook: []
    }

    handleSearch = (e) => {
        console.log(e.target.value)

        if (e.target.value) {
            BooksAPI.search(e.target.value).then(searchedBook => {
                console.log('books', searchedBook)
                if (searchedBook.error) {
                    return
                } else {
                    this.setState({ searchedBook })
                }

            })
        }


    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBook && <BookShelf shelfBooks={this.state.searchedBook} shelves="Search" />}
                    </ol>
                </div>
            </div>
        )
    }
}
