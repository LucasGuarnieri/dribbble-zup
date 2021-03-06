'use strict'

import React, { Component } from 'react'

/**
* Search bar of shot list
**/
class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { term: '' }
  }

  render () {
    return (
      <div className='search-bar'>
        <input type='search' placeholder='Search...' onChange={event => this.onInputChange(event.target.value)} />
      </div>
    )
  }

  onInputChange (term) {
    this.setState({term})
    this.props.onSearchTermChange(term.trim())
  }
}

export default SearchBar
