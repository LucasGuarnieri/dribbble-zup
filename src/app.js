'use strict'

import _ from 'lodash'
import React, { Component } from 'react'
import SearchBar from './components/search_bar'
import ShotList from './components/shot_list'
import { dribbbleApi } from './services/DribbbleApi'

class App extends Component {
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

  // load shots
  loadShots () {
    dribbbleApi.get('shots/', { page: this.state.page, per_page: 5 }).then((result) => {
      let data = this.state.shots

      this.setState({
        shots: data.concat(result.data),
        allShots: data.concat(result.data),
        isLoading: false
      })
    })
  }

  // filter shots
  shotSearch (term) {
    this.setState({
      shots: this.state.allShots.filter((shot) => {
        const regex = new RegExp(term, 'i')
        return regex.test(shot.title)
      })
    })
  }

  // load more shots for grid
  loadMore () {
    this.setState({
      isLoading: true,
      page: this.state.page++
    })

    this.loadShots()
  }

  // render
  render () {
    const shotSearch = _.debounce((term) => { this.shotSearch(term) }, 300)
    return (
      <main className='main-container'>
        <header className='header'>
          <div className='header-content'>
            <h1 title='Dribbble Zup'>Dribbble Zup</h1>
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
      </main>
    )
  }
}

export default App
