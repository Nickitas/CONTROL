import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode'
import { BackLink } from '../../components/UI/BackLink/BackLink'
import { FuncBtn } from '../../components/UI/buttons/FuncBtn/FuncBtn'
import { monitoringFunctional } from '../../utils/functionalConsts'
import { MONITORING_ROUT } from '../../utils/routersPath'
import classes from './monitoring.module.scss'


const Monitoring = () => {
    const { auth } = useAuth()
    const location = useLocation()

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const userRole = decoded?.UserInfo?.roles || []

    const monitoring = (
        <section className={classes.monitoring}>
            <div className='container'>
                <BackLink />
                {
                    location.pathname === `/${MONITORING_ROUT}` ? (<>
                        <div className={classes.row}>
                            <h1 className='title'>Мониторинг</h1>
                        </div>
                        <h2 className='subtitle'>Доступный функционал:</h2>
                        <div className={classes.grid}>
                            {
                                monitoringFunctional.filter(ctx => ctx._lvl.includes(userRole[0])).map(ctx => (
                                    <FuncBtn key={ctx.path}
                                        img={ctx.img}
                                        title={ctx.title}
                                        disc={ctx.disc}
                                        path={ctx.path}
                                    />
                                ))
                            }
                        </div>
                    </>) : <Outlet />
                }
            </div>
        </section>
    )

    return monitoring
}

export default Monitoring