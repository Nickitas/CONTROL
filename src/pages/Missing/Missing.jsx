import { NavLink } from 'react-router-dom'
import { BackLink } from '../../components/UI/BackLink/BackLink'
import { ActionBtn } from '../../components/UI/buttons/ActionBtn/ActionBtn'
import { HOME_ROUT } from '../../utils/routersPath'
import { ChevronLeft } from '../../components/svg.module'
import classes from './missing.module.scss'


const Missing = () => {

    const missing = (
        <section className={classes.missing}>
            <div className='container'>
                <BackLink />
                <div className={classes.row}>
                    <h1 className='title'>Такой страницы нет на {location.host}!</h1>
                </div>

                <div className={classes.not_found}>
                    404
                </div>

                <div className={classes.col}>
                    <h2 className='subtitle'>Давай начнем сначала</h2>
                    <ActionBtn ico={<ChevronLeft/>}>
                        <NavLink to={HOME_ROUT}>Вернуться на главную</NavLink>
                    </ActionBtn>
                </div>


                <div className={classes.cat}>
                    <div className={classes.cat__ears}></div>
                    <div className={classes.cat__face}>
                        <div className={classes.cat__eyes}></div>
                        <div className={classes.cat__nose}></div>
                        <div className={classes.cat__mouth}></div>
                    </div>
                    <div className={classes.cat__body}></div>
                    <div className={classes.cat__tail}></div>
                    <div className={classes.cat__legs}></div>
                    </div>
            </div>
        </section>
    )

    return missing
}

export default Missing