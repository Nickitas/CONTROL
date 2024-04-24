import React, { StrictMode } from 'react'
import Snowfall from 'react-snowfall'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'

ReactDOM.render(
  // <StrictMode>
  <>
    <App />
    {/* <Snowfall /> */}
  </>,
  // </StrictMode>,
  document.getElementById('root')
)