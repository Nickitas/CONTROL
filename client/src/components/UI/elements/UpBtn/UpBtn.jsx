import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { HandUp } from '../../../../svg.module'
import classes from './UpBtn.module.scss'

const handlerClick = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

const UpBtn = () => {
    return (
        <Tooltip title='Подняться вверх' placement='top'>
            <div className={classes.UpBtn} onClick={handlerClick}>
                <HandUp/>
            </div>
        </Tooltip>
    )
}

export default UpBtn