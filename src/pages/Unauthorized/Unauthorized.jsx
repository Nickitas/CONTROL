import { Link } from 'react-router-dom'
import { HOME_ROUT } from '../../utils/routersPath'
import classes from './unauthorized.module.scss'


const Unauthorized = () => {

    const content = (
        <section className={classes.unauthorized}>
            <div className='container'>
                <div className={classes.col}>
                    <h1 className='title'>Для вашей учетной записи не были даны права на данный раздел</h1>
                    <h2 className='subtitle'>Попробуйте авторизироваться снова</h2>
                    <Link to={HOME_ROUT}>Подтвердить аутентификацию</Link>
                </div>
            </div>
        </section>
    )

    return content
}

export default Unauthorized