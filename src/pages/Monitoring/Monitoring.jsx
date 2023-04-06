
import { Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode'

import { BackLink } from '../../components/UI/BackLink/BackLink'
import { FuncBtn } from '../../components/UI/buttons/FuncBtn/FuncBtn'

import { monitoringFunctional } from '../../utils/functionalConsts'
import { HOUSEKEEPER_ROUT, KEY_ACCOUNTING_ROUT, EL_JOURNAL_ROUT, SUBUNIT_ROUT, ROOMS_LIST_ROUT, DISTURBERS_ROUT } from '../../utils/routersPath'
import classes from './monitoring.module.scss'


const Monitoring = () => {
    const { auth } = useAuth()

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const userRole = decoded?.UserInfo?.roles || []

    return (
        <section className={classes.monitoring}>
            <div className='container'>

                <BackLink />
                
                <div className={classes.row}>
                    <h1 className='title'>Мониторинг</h1>
                </div>

                <Outlet/>

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
            </div>
        </section>
    )
}

export default Monitoring