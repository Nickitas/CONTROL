import React from 'react'

import { ChevronLeft } from '../../../svg.module'
import classes from './video_stream.module.scss'

const VideoStream = ({ setWay }) => {
    
    return (
        <section className={classes.video_stream}>
            <div className='container'>
            <div className={classes.breadcrumb} onClick={() => setWay(true)}><ChevronLeft/>Назад</div>
                <div className={classes.row}>
                    <h2 className={classes.title}>Видеонаблюдение</h2>
                </div>
                <div className={classes.row}>
                    <iframe src="https://construction.donstu.ru/api/0" width="50%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://construction.donstu.ru/api/1" width="50%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://dstu-buffets-cams.donstu.ru/video_feed" width="100%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>
            </div>
        </section>
    )
}
export default VideoStream