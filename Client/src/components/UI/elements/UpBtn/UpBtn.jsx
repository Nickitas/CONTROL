import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { HandUp } from '../../../../svg.module'
import classes from './UpBtn.module.scss'

const UpBtn = () => {
    return (
        <Tooltip title='Подняться вверх' placement='top'>
            <div className={classes.UpBtn} onClick={() => { window.scrollTo(0,0) }}>
                <HandUp/>
            </div>
        </Tooltip>
    )
}
export default UpBtn