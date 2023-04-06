
import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './cards.module.scss'


const Cards = () => {

    return (
       <section className={classes.cards}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница работы с пропусками...</h1>

                <Loading/>


            </div>
       </section>
    )
}

export default Cards