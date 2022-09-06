import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { ReactComponent as Logo} from '../../img/logo.svg'
import { Link } from 'react-router-dom'
import { Log } from '../../svg.module'
import classes from './Header.module.scss'

const Header = ({setState, setIsAuth}) => {
    return (
        <header className={classes.Header}>
            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.logo_wrapper} onClick={() => {setState('')}}>
                        <Tooltip title='Вернуться на главную' placement='right-end'>
                            <Link to='/' className={classes.logo_link}>
                                <Logo className={classes.Logo} width={'6em'} height={'3em'}/>
                            </Link>
                        </Tooltip>
                    </div>
                    <Tooltip title='выход' placement='left'>
                        <a className='exit-link' onClick={() => {
                            localStorage.removeItem('token')
                            setIsAuth(e => false)
                        }}>Выйти
                            <Log/>
                        </a>
                    </Tooltip>
                </div>
            </div>
        </header>
    )
}
export default Header