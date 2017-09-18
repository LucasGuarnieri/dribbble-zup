'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { dribbbleApi } from '../../services/DribbbleApi'

class ShotDetail extends Component {
  constructor (props) {
    super(props)

    // config moment locale
    Moment.locale('en')

    this.state = {
      shotId: this.props.match.params.shotId,
      shot: null,
      liked: false
    }

    this.loadShot()
  }

  loadShot () {
    dribbbleApi.get(`shots/${this.state.shotId}/`, {}).then((result) => {
      this.setState({ shot: result.data })
    }).catch(() => {
      // if not found the shot
      this.setState({shot: { error: true }})
    })

    this.checkShotLike()
  }

  checkShotLike () {
    dribbbleApi.get(`shots/${this.state.shotId}/like`, {}).then((result) => {
      this.setState({ liked: true })
    }).catch(() => {
      // if not found the shot
      this.setState({liked: false})
    })
  }

  updateLike () {
    if (this.state.liked) {
      dribbbleApi.delete(`shots/${this.state.shotId}/like`).then((result) => {
        this.setState({ liked: false })
      })
    } else {
      dribbbleApi.post(`shots/${this.state.shotId}/like`).then((result) => {
        this.setState({ liked: true })
      })
    }

    console.log(this.state)
  }

  descriptionShot () {
    return { __html: this.state.shot.description }
  }

  render () {
    const shot = this.state.shot

    if (!shot) return <h2>loading...</h2>
    if (shot.error) return <h2>Page not found</h2>

    return (
      <div>
        <header className='header'>
          <div className='header-content'>
            <h1 title='Dribbble Zup'><Link to={'/'}>Dribbble Zup</Link></h1>
          </div>
        </header>
        <div className='content'>
          <article className='shot-detail'>
            <header className='shot-header'>
              <h2>{shot.title}</h2>
              <small>by <em>{shot.user.name}</em> on {Moment(shot.created_at).format('MMMM D, YYYY')}</small>
            </header>

            <div className='shot-content'>
              <div>
                <div className='shot-image'><img src={shot.images['normal']} title={shot.title} alt={shot.title} /></div>
                <div className='shot-description' dangerouslySetInnerHTML={this.descriptionShot()} />
              </div>

              <div>
                <div>
                  <button onClick={() => { this.updateLike() }} className={this.state.liked ? 'btn-like active' : 'btn-like'}>{this.state.liked ? 'like' : 'like?'}</button>
                  <span>likes: {shot.likes_count}</span>
                </div>

                <div>
                  <h4>Tags:</h4>
                  <div>{shot.tags.map((tag, i) => { return <span className='tag-name' key={i}>{tag}</span> })}</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

export default ShotDetail
