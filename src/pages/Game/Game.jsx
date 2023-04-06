
import { Loading } from '../../components/UI/loadings/Loading/Loading'
import classes from './game.module.scss'

const Game = () => {

    return (
        <section className={classes.game}>
            <div className='container'>
                
                <h1 className='title'>Скоро здесь будет страница с играми...</h1>

                <Loading/>

            </div>
        </section>
    )
}

export default Game