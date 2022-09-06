import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { ReactComponent as Update } from '../../../../img/update.svg'
import classes from './UpdateBtn.module.scss'

const UpdateBtn = () => {
    return (
        <Tooltip title='Обновить таблицу' placement='right-end'>    
            <div className={classes.Update}>
                <Update/>
            </div>
        </Tooltip>
    )
}
export default UpdateBtn