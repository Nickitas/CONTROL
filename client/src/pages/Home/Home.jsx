import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'

// import videoBg from '../../../public/video/them2.mp4'
import videoBg from '../../../public/video/them1.mp4'
import { Play, Stop } from '../../svg.module'
import classes from './home.module.scss'


const Home = () => {

    const [toggleVideo, setToggleVideo] = useState(true)
    const [timeToHidden, setTimeToHidden] = useState(false)

    setTimeout(() => {
        setTimeToHidden(true)
    }, 4000)

    const handlerToggleVideo = () => {
        const video = document.getElementById('video')
        setToggleVideo(e => !e)
        toggleVideo ? video.play() : video.pause()
    }

    return (
        <div className={classes.Home}>
            <video autoPlay muted loop id='video'>
                <source src={videoBg} type='video/mp4' />
            </video>
            <h6 className={`${classes.hellow} ${timeToHidden ? classes.hidde : ''}`}>
                Добро пожаловать,<span> {localStorage.getItem('login')}</span>!
            </h6>
            <div className={classes.hero}>
                
                <h1><strong>CONTROLL <sup>®</sup></strong> - информационная система УКБ ДГТУ</h1>
                <p>Панель управления карточной пропускной системой в Донском Государственном Техническом Университете</p>
                <p>Разработчики: <br/>Кодацкий Н.М. и Муратов И.А.</p>

                <Tooltip title={`${toggleVideo ? 'Остановить видео' : 'Воспроизвести видео'}`} placement='top'>
                    <div className={classes.controll} onClick={handlerToggleVideo}>
                        {toggleVideo ? <Stop/> : <Play/>}
                    </div>
                </Tooltip>

            </div>
        </div>
    )
}

export default Home