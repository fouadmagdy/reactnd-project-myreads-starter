import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Navbar from '../components/Navbar'
import BookShelf from '../components/BookShelf'
import Loader from '../components/Loader'

export default class HomePage extends Component {

    state = {
        books: [],
        currentReading: [],
        wantToRead: [],
        read: [],
        loading: true
    }


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })

            this.shelfHandler()
            this.setState({ loading: false })
        })
    }

    shelfHandler = () => {
        this.setState((currentState) => ({
            currentReading: currentState.books.filter((book) => {
                return book.shelf === "currentlyReading"
            })
        }))

        this.setState((currentState) => ({
            wantToRead: currentState.books.filter((book) => {
                return book.shelf === "wantToRead"
            })
        }))

        this.setState((currentState) => ({
            read: currentState.books.filter((book) => {
                return book.shelf === "read"
            })
        }))
    }



    onChangeBookHomepage = (id, shelf) => {

        BooksAPI.update(id, shelf).then((book) => {
            console.log('book', book)
            this.setState({ loading: true })
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
                this.shelfHandler()
                this.setState({ loading: false })
            })
        })
    }

    render() {

        console.log(this.state.books)

        return (
            <div className="list-books">
                <Navbar />
                <div className="list-books-content">
                    <div>
                        {this.state.loading ? (<Loader />) : (
                            <>
                                <BookShelf onChangeBookHomepage={(id, shelf) => { this.onChangeBookHomepage(id, shelf) }} shelfBooks={this.state.currentReading} shelves="Currently Reading" />
                                <BookShelf onChangeBookHomepage={(id, shelf) => { this.onChangeBookHomepage(id, shelf) }} shelfBooks={this.state.wantToRead} shelves="Want to Read" />
                                <BookShelf onChangeBookHomepage={(id, shelf) => { this.onChangeBookHomepage(id, shelf) }} shelfBooks={this.state.read} shelves="Read" />
                            </>
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}
