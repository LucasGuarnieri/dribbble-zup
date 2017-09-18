'use strict'

import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import striptags from 'striptags'

/**
* Item of shot list
**/
const ShotListItem = ({shot, sizeImage}) => {
  return (
    <Link to={`/shot/${shot.id}`} className='shot-list-item'>
      <div className='shot-list-img'>
        <img src={shot.images[sizeImage]} alt={shot.title} title={shot.title} />
      </div>
      <div className='shot-list-description'>
        <h4>{shot.title}</h4>
        <p>{striptags(shot.description)}</p>

        <strong className='shot-author'>by {shot.user.name}</strong>
      </div>
      <ul className='shot-social'>
        <li><FontAwesome name='eye' />{shot.views_count}</li>
        <li><FontAwesome name='comment' />{shot.comments_count}</li>
        <li><FontAwesome name='heart' />{shot.likes_count}</li>
      </ul>
    </Link>
  )
}

export default ShotListItem
