

import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './profile.module.scss'


const Profile = () => {


    return (
        <section className={classes.profile}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница Вашего профиля...</h1>

                <Loading/>


            </div>
        </section>
    )
}

export default Profile