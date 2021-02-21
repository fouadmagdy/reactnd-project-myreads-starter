import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from '../components/BookShelf'

export default class Search extends Component {

    state = {
        searchedBook: [],
        empty: false,
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => (
            { query }
        ), () => {
            this.handleSearch()
        })
    }

    handleSearch = (e) => {


        if (this.state.query) {
            BooksAPI.search(this.state.query).then(searchedBook => {
                console.table('books', searchedBook)
                if (searchedBook.error) {
                    this.setState({ searchedBook: [], empty: true })
                } else {
                    this.setState({ searchedBook, empty: false })
                }

            })
        } else if (this.state.query === "") {
            this.setState({ searchedBook: [], empty: false })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.empty && !this.state.query && (<p>No Result !</p>)}
                        {this.state.searchedBook && !this.state.error && this.state.query && <BookShelf shelfBooks={this.state.searchedBook} searchedBook={true} shelves="Search" />}
                    </ol>
                </div>
            </div>
        )
    }
}
