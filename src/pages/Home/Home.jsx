import React, { useState, useEffect } from 'react'
import { Alert } from '../../components/UI/Alert/Alert'
import { VIDEO, HELLOW_PHRASES, NICK, ILIM } from '../../utils/baseConsts'
import classes from './home.module.scss'


const Home = () => {
    const [timeToHidden, setTimeToHidden] = useState(false)
    const [alertState, setAlertState] = useState({ show: false, type: '', message: '' })

    useEffect(() => {
        setTimeout(() => {
            setTimeToHidden(true)
        }, 4500)
    }, [])

    const handlerCopyDevLink = (name) => {
        navigator.clipboard.writeText(name)
        .then(() => setAlertState({
            show: true,
            message: `Telegram ${name} скопирован! ☜(ﾟヮﾟ☜)`
        }))
        .catch(err => setAlertState({
            show: true,
            message: `Что-то пошло не так... Нажмите еще разок (´。＿。｀)`
        }))
    }

    const randomInt = (max) => Math.floor(Math.random() * max)

    const userName = JSON.parse(localStorage.getItem('user'))

    const home = (
        <section className={classes.home}>
            <video autoPlay muted loop id='video'>
                <source src={VIDEO[randomInt(VIDEO.length)]} type='video/mp4' />
            </video>

            <span className={`${classes.hellow} ${timeToHidden ? classes.hidde : ''}`}>
                { HELLOW_PHRASES[randomInt(HELLOW_PHRASES.length)] },<span> { userName }</span>!
            </span>

            <div className={classes.hero}>
                <h1 className='title'><strong>CONTROL<sup>®</sup></strong> <span>- информационная система УКБ ДГТУ</span></h1>
                <p className='text'>Сервис администрирования СКУД в Донском Государственном Техническом Университете</p>
                <div className={classes.developers}>
                    <p>Разработчики:</p>
                    <p className={classes.dev_links}>
                        <a onClick={() => handlerCopyDevLink(NICK)}>
                            Кодацкий Н.М.
                        </a>
                        <span>и</span>
                        <a onClick={() => handlerCopyDevLink(ILIM)}>
                            Муратов И.А.
                        </a>
                    </p>
                </div>
            </div>

            <Alert 
                alertState={alertState} 
                setAlertState={setAlertState} 
            />

        </section>
    )

    return home
}

export default Home