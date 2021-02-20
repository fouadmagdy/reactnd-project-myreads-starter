import React, { Component } from 'react'
import BookItem from './BookItem'


export default class BookShelf extends Component {

    changeBook = (id, shelf) => {
        if (this.props.onChangeBookHomepage) {
            this.props.onChangeBookHomepage(id, shelf)
        }
    }

    render() {

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelves}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.shelfBooks.map((book) => (
                            <BookItem key={book.id} searchedBook={true} book={book} onChangeBook={(id, shelf) => { this.changeBook(id, shelf) }} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
