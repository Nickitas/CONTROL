import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import classes from './Home.module.scss'

import videoBg from '../../img/video/them2.mp4'
import { Play, Stop } from '../../svg.module'


const Home = () => {

    const [toggleVideo, setToggleVideo] = useState(true)
    const [timeToHidden, setTimeToHidden] = useState(false)

    setTimeout(() => {
        setTimeToHidden(true)
    }, 4000);

    return (
        <div className={classes.Home}>
            <video autoPlay muted loop id='video'>
                <source src={videoBg} type="video/mp4" />
            </video>
            <h1 className={`${classes.hellow} ${timeToHidden?classes.hidde:''}`}>Добро пожаловать,<span> {localStorage.getItem('login')}</span>!</h1>
            <div className={classes.hero}>
                <h1><strong>CONTROLL <sup>®</sup></strong> - информационная система УКБ ДГТУ</h1>
                <p>Панель управления карточной пропускной системой в Донском Государственном Техническом Университете</p>
                <p>Разработчики: <br/>Кодацкий Н.М. и Муратов И.А.</p>
                <Tooltip title={`${toggleVideo?'Остановить видео':'Воспроизвести видео'}`} placement='top'>
                    <div className={classes.controll} onClick={() => {
                        const video = document.getElementById('video')
                        setToggleVideo(e => !e)
                        toggleVideo?video.play():video.pause()
                    }}>
                        {toggleVideo?<Stop/>:<Play/>}
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}
export default Home