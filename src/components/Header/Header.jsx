import Tooltip from '@mui/material/Tooltip'
import { NavLink } from 'react-router-dom'
import { HOME_ROUT } from '../../utils/routersPath'
import { Control } from '../svg.module'
import { ThemeBtn } from '../UI/ThemeBtn/ThemeBtn'
import classes from './header.module.scss'


const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.logo_wrapper}>
                        <Tooltip title='Вернуться на главную' placement='right-end'>
                            <NavLink to={HOME_ROUT}>
                                <Control/>
                            </NavLink>
                        </Tooltip>
                    </div>
                    <ThemeBtn />
                </div>
            </div>
        </header>
    )
} 

export default Header