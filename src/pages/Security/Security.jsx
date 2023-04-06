

import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './security.module.scss'


const Security = () => {


    return (
        <section className={classes.security}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница работы по мониторингу безопасности...</h1>

                <Loading/>


            </div>
        </section>
    )
}

export default Security