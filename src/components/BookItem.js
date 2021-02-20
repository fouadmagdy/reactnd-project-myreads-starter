import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

export default class BookItem extends Component {

    state = {
        book: {}
    }

    handleSelect = (e) => {

        let { value } = e.target

        if (this.props.onChangeBook) {
            this.props.onChangeBook(this.props.book.id, value)

            if (this.props.searchedBook === true) {
                BooksAPI.get(this.props.book.id).then((book) => {
                    this.setState({ book })
                    const cartItemsFromStorage = JSON.parse(localStorage.getItem('books'))
                    this.setState((currentState) => ({ book: currentState.book.shelf = value }))
                    cartItemsFromStorage.push(book)
                    localStorage.setItem('books', JSON.stringify(cartItemsFromStorage))
                    alert(`This Book Added to your ${value} Category`)
                })
            }

        }
    }

    render() {

        const { title, authors, imageLinks, shelf } = this.props.book

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleSelect} value={shelf ? shelf : 'none'}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors[0]}</div>
                </div>
            </li>
        )
    }
}
