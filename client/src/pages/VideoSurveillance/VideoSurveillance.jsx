import React, { useState } from 'react'

import { FileFind, Network, WebCam } from '../../svg.module'
import Directory from './Directory/Directory'
import Net from './Net/Net'
import VideoStream from './VideoStream/VideoStream'
import ExtraBtn from '../../components/UI/buttons/ExtraBtn'
import classes from './video_surveillance.module.scss'


const VideoSurveillance = ({ success, isAuth, lvl }) => {
    
    const [way, setWay] = useState('')

    if(way == 'Directory' & [0].includes(lvl)) {
        return <Directory setWay={setWay} />
    }
    if(way == 'Net' & [0].includes(lvl)) {
        return <Net setWay={setWay} />
    }
    if(way == 'VideoStream' & [0].includes(lvl)) {
        return <VideoStream setWay={setWay} />
    }
    else {
        return (
            <section className={classes.video_surveillance}>
                <div className='container'>
                    <div className={classes.row}>
                        <h2 className={classes.title}>Видеонаблюдение</h2>
                    </div>

                    <div className={classes.buttons_list}>
                        <h3 className={classes.subtitle}>Доступный функционал:</h3>
                        {[0].includes(lvl)&&<ExtraBtn onClick={() => setWay('Directory')}>
                            <FileFind/>
                            <span>Справочник</span>
                        </ExtraBtn>}
                        {[0].includes(lvl)&&<ExtraBtn onClick={() => setWay('Net')}>
                            <Network/>
                            <span>Сеть</span>
                        </ExtraBtn>}
                        {[0].includes(lvl)&&<ExtraBtn onClick={() => setWay('VideoStream')}>
                            <WebCam/>
                            <span>Видеонаблюдение</span>
                        </ExtraBtn>}
                    </div>

                </div>        
            </section>
        )
    }
}

export default VideoSurveillance