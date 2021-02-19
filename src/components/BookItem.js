import React, { Component } from 'react'

export default class BookItem extends Component {

    handleSelect = (e) => {

        if (this.props.onChangeBook) {
            this.props.onChangeBook(this.props.book.id, e.target.value)
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
