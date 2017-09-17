'use strict'

import React from 'react'
import striptags from 'striptags'

const ShotListItem = ({shot, sizeImage}) => {
  return (
    <div className='shot-list-item'>
      <div className='shot-list-img'>
        <img src={shot.images[sizeImage]} alt={shot.title} title={shot.title} />
      </div>
      <div className='shot-list-description'>
        <h4>{shot.title}</h4>
        <p>{striptags(shot.description)}</p>
      </div>
    </div>
  )
}

export default ShotListItem
