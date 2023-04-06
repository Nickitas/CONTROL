

import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './video_surveillance.module.scss'


const VideoSurveillance = () => {


    return (
        <section className={classes.video_surveillance}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница работы с видео-регистраторами...</h1>

                {/* <Loading/> */}

                <div className={classes.row}>
                    <iframe src="https://dstu-buffets-cams.donstu.ru" width="100%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://construction.donstu.ru/api/0" width="50%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    <iframe src="https://construction.donstu.ru/api/1" width="50%" height="600px" frameBorder="0" allowFullScreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>


            </div>
       </section>
    )
}

export default VideoSurveillance