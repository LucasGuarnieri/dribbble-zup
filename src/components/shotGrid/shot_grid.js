'use strict'

import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Custom Components
import SearchBar from './search_bar'
import ShotList from './shot_list'

// Services
import { dribbbleApi } from '../../services/DribbbleApi'

/**
* Class of page shot grid
**/
class ShotGrid extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shots: [],
      allShots: [],
      isLoading: true,
      page: 1,
      sizeImage: 'teaser'
    }

    // loading shots on start
    this.loadShots()
  }

  /**
  * Method to load shot using api
  **/
  loadShots () {
    dribbbleApi.get('shots/', { page: this.state.page, per_page: 20 }).then((result) => {
      let data = this.state.shots

      this.setState({
        shots: data.concat(result.data),
        allShots: data.concat(result.data),
        isLoading: false
      })
    })
  }

  /**
  * Filter of shots in state
  **/
  shotSearch (term) {
    this.setState({
      shots: this.state.allShots.filter((shot) => {
        const regex = new RegExp(term, 'i')
        return regex.test(shot.title)
      })
    })
  }

  /**
  * Pagination of shots (event of button load more)
  **/
  loadMore () {
    this.setState({
      isLoading: true,
      page: ++this.state.page
    })

    this.loadShots()
  }

  /**
  * Render method
  **/
  render () {
    const shotSearch = _.debounce((term) => { this.shotSearch(term) }, 300)
    return (
      <div>
        <header className='header'>
          <div className='header-content'>
            <h1 title='Dribbble Zup'><Link to={'/'}>Dribbble Zup</Link></h1>
            <SearchBar onSearchTermChange={shotSearch} />
          </div>
        </header>
        <div className='content'>
          <div className='shot-sizes'>
            <button onClick={() => { this.setState({ sizeImage: 'teaser' }) }} className={this.state.sizeImage === 'teaser' ? 'active' : ''}>Small</button>
            <button onClick={() => { this.setState({ sizeImage: 'normal' }) }} className={this.state.sizeImage === 'normal' ? 'active' : ''}>Big</button>
          </div>

          <ShotList shots={this.state.shots} sizeImage={this.state.sizeImage} />
          <button onClick={() => { this.loadMore() }} disabled={this.state.isLoading} className='btn-load-more'>{this.state.isLoading ? 'loading...' : 'load more shots'}</button>
        </div>
      </div>
    )
  }
}

export default ShotGrid
