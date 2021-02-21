import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'


import HomePage from './components/HomePage'
import Search from './components/Search'
import Error from './components/Error'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path='/search' component={Search} />
            <Route path='/' exact component={HomePage} />
            <Route path='*' component={Error} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
