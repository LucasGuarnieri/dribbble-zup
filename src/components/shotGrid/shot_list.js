'use strict'

import React from 'react'
import ShotListItem from './shot_list_item'

/**
* List shot item
**/
const ShotList = (props) => {
  const shotItems = props.shots.map(
    (shot) => {
      return <ShotListItem shot={shot} key={`${shot.id}`} sizeImage={props.sizeImage} />
    }
  )

  return (
    <div className='shot-list'>
      {shotItems}
    </div>
  )
}

export default ShotList
