import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { Sun, Moon } from '../../../../svg.module'
import classes from './ThemBtn.module.scss'

const html = document.querySelector('html')

const ThemBtn = () => {

  const [them, setThem] = useState(false)
  localStorage.setItem('them', them)
  html.setAttribute('data-them', them)

  return (
    <Tooltip title={`Вкл. ${!them?'светлую':'темную'} тему`} placement='top'>
      <div className={classes.ThemBtn} onClick={() => { setThem(e => !e) }}>
          {them ? <Moon/> : <Sun/>}
        </div>
    </Tooltip>
  )
}

export default ThemBtn