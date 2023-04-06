import Tooltip from '@mui/material/Tooltip'
import { UpdateIcon } from '../../../svg.module'
import classes from './update_btn.module.scss'


const UpdateBtn = ({ setData }) => {
    return (
        <Tooltip title='Обновить данные' placement='right-end'>    
            <div className={classes.update_btn} onClick={() => setData([])}>
                <UpdateIcon/>
            </div>
        </Tooltip>
    )
}

export { UpdateBtn }