// import { Tooltip } from '../../UI/Tooltip/Tooltip'
import { Tooltip } from '@mui/material'
import { SunIcon, MoonIcon } from '../../svg.module'
import { useTheme } from '../../../hooks/useTheme'
import classes from './theme_btn.module.scss'

const ThemeBtn = () => {
    const { theme, toggleTheme } = useTheme()

    const theme_btn = (
        <Tooltip title={`Вкл. ${theme === 'dark' ? 'светлую' : 'темную'} тему`} placement='top'>
            <div className={classes.theme_btn} onClick={toggleTheme}>
                { theme === 'dark' ? <SunIcon /> : <MoonIcon /> }
            </div>
        </Tooltip>
    )

    return theme_btn
}

export { ThemeBtn }