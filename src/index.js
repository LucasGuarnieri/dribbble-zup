'use strict'

import React from 'react'
import { render } from 'react-dom'

// routing components
import { BrowserRouter } from 'react-router-dom'

// Custom Components
import Main from './components/main'

// stylesheets
import './assets/sass/style.sass'

render(
  <BrowserRouter component={Main}>
    <Main />
  </BrowserRouter>,
  document.querySelector('[data-js="app"]')
)
