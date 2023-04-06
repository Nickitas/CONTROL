

import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './hostels.module.scss'

const Hostels = () => {


    return (
        <section className={classes.hostels}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница работы с пропусками общежитий...</h1>

                <Loading/>


            </div>
    </section>
    )
}

export default Hostels