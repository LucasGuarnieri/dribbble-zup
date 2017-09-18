'use strict'

import React from 'react'
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
      </div>
    </Link>
  )
}

export default ShotListItem
