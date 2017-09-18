'use strict'

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ShotGrid from './shotGrid/shot_grid'
import ShotDetail from './shotDetail/shot_detail'

/**
* Base class with routes.
**/
class Main extends Component {
  render () {
    return (
      <main className='main-container'>
        <Switch>
          <Route exact path='/' component={ShotGrid} />
          <Route path='/shot/:shotId' component={ShotDetail} />
        </Switch>
      </main>
    )
  }
}

export default Main
