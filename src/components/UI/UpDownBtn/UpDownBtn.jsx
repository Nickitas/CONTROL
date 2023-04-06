import { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { HandUpIcon } from '../../svg.module'
import classes from './up_down_btn.module.scss'


const UpDownBtn = () => {
    const [isTop, setIsTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
            if (scrollTop === 0) {
                setIsTop(true)
            } else {
                setIsTop(false)
            }
        }
    
        window.addEventListener('scroll', handleScroll)
    
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const handlerClick = () => {
        if (isTop) {
            window.scrollTo({
                top: document.body.scrollHeight * 1000,
                left: 0,
                behavior: 'smooth',
            })
            setIsTop(false)
        } else {
            window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setIsTop(true);
        }
    }

    const up_down_btn = (
        <Tooltip title={isTop ? 'Подняться вниз' : 'Подняться вверх'} placement='top'>
            <div className={`${classes.up_down_btn} ${isTop ? classes.rot : ''}`} onClick={handlerClick}>
                <HandUpIcon />
            </div>
        </Tooltip>
    )

    return up_down_btn
}

export { UpDownBtn }